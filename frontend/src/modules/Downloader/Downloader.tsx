import SearchBox from "../../components/SearchBox";
import axios from "axios";
import { useState } from "react";
import ItemCard from "../../components/ItemCard";
import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import CompletedList from "../../components/completedList";

export type Thumbs = {
  url: string;
  width: number;
  height: number;
};

export interface VideoItem {
  url: string;
  title: string;
  thumbnail: Thumbs[];
  videoId: string;
  length: string;
  status: "NotStarted" | "Starting" | "Downloading" | "Finished" | "Error";
  progress: number;
  fileName: string;
  error: any;
}

const Downloader = () => {
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.defaults.baseURL = "http://localhost:3001/api";

  const [isError, setIsError] = useState<string>("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [downloadItem, setDownloadItem] = useState<VideoItem[]>([]);
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  enum ACTION {
    UPDATE = "action",
    ADD = "add",
    REMOVE = "remove",
  }

  const updateDownloadItems = (
    videoId: string,
    action: ACTION,
    item?: VideoItem
  ) => {
    const index = downloadItem.findIndex((dl) => dl.videoId === videoId);
    switch (action) {
      case ACTION.ADD:
        if (item) {
          setDownloadItem([...downloadItem, item]);
        }
        break;
      case ACTION.UPDATE:
        if (item) {
          const newList = [...downloadItem];
          newList[index] = item;
          setDownloadItem(newList);
        }
        break;
      case ACTION.REMOVE:
        const updatedArray = [...downloadItem];
        updatedArray.splice(index, 1);
        setDownloadItem(updatedArray);
        break;
    }
  };

  const getUpdates = () => {
    axios.get(`/downloading`).then((res) => {
      const updatingItem = JSON.parse(JSON.stringify(downloadItem));
      res.data.forEach((item: any) => {
        const index = downloadItem.findIndex((dl) => dl.videoId === item.id);

        if (index >= 0) {
          updatingItem[index].progress = item.progress;
          updatingItem[index].status = item.status;
          updatingItem[index].fileName = item.fileName;
          updatingItem[index].error = item.error;

          if (item.status === "Finished") {
            axios.delete(`/cleardownloading`, { params: { id: item.id } });
            setDownloadedItems([...downloadedItems, item.fileName]);
          }
        }
      });
      setDownloadItem(updatingItem);
      setTick(tick + 1);
      if (
        res.data.every(
          (item: VideoItem) =>
            item.status === "Finished" || item.status === "Error"
        )
      ) {
        setTick(0);
      }
    });
  };

  useEffect(() => {
    if (tick === 0) return;
    const intervalId = setInterval(() => {
      getUpdates();
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, downloadItem]);

  const fetchInfo = (url: string) => {
    if (url.length === 0) {
      setIsError("You tried searching nothing");
      return;
    }
    setUrlLoading(true);
    axios.get(`/details`, { params: { url: url } }).then((res) => {
      const vd = res.data.videoDetails;
      if (!vd) {
        setIsError("There was an error find the video");
        setUrlLoading(false);
        return;
      }
      if (downloadItem.some((i) => i.url === vd.video_url)) {
        setIsError("Item already in the list");
        setUrlLoading(false);
        return;
      }

      const item: VideoItem = {
        url: vd.video_url,
        title: vd.title,
        thumbnail: vd.thumbnails,
        videoId: vd.videoId,
        length: vd.lengthSeconds,
        status: "NotStarted",
        progress: 0,
        fileName: "",
        error: "",
      };

      updateDownloadItems(item.videoId, ACTION.ADD, item);
      setUrlLoading(false);
    });
  };

  const getDownload = (videoId: string) => {
    const index = downloadItem.findIndex((di) => di.videoId === videoId);
    const updated = downloadItem[index];
    updated.status = "Starting";
    updated.progress = 0;
    updateDownloadItems(videoId, ACTION.UPDATE, updated);

    axios.get(`/download`, { params: { url: videoId } }).then((res) => {
      updated.status = res.data.status;
      updateDownloadItems(videoId, ACTION.UPDATE, updated);
      setTick(1);
    });
  };

  return (
    <>
      <SearchBox
        fetchItem={fetchInfo}
        isError={isError}
        isLoading={urlLoading}
        setIsError={setIsError}
      />
      <Stack>
        {downloadItem.length > 0 && (
          <>
            {downloadItem.map((dLItem) => {
              return (
                <ItemCard
                  key={dLItem.videoId}
                  details={dLItem}
                  getDownload={() => getDownload(dLItem.videoId)}
                  removeItem={(r) => updateDownloadItems(r, ACTION.REMOVE)}
                />
              );
            })}
          </>
        )}
        {downloadedItems.length > 0 && (
          <CompletedList
            list={downloadedItems}
            clearList={() => setDownloadedItems([])}
          />
        )}
      </Stack>
    </>
  );
};

export default Downloader;
