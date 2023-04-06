import SearchBox from '../../components/SearchBox';
import axios from 'axios';
import { useState } from 'react';
import ItemCard from '../../components/ItemCard';
import { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import CompletedList from '../../components/completedList';

type Thumbs = {
  url: string;
  width: number;
  height: number;
};

interface VideoItem {
  url: string;
  title: string;
  thumbnail: Thumbs[];
  videoId: string;
  length: string;
  downloaded: 'YES' | 'NO' | 'InProgress';
  status: 'NotStarted' | 'Starting' | 'Downloading' | 'Finished';
  progress: number;
  fileName: string;
  error: any;
}

const Downloader = () => {
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.defaults.baseURL = 'http://localhost:3001/api';

  const [isError, setIsError] = useState<string>('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [downloadItem, setDownloadItem] = useState<VideoItem[]>([]);
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);
  const [tick, setTick] = useState(0);
  const [dl, setDl] = useState('');

  const getUpdates = () => {
    axios.get(`/downloading`).then((res) => {
      const updatingItem = downloadItem;
      res.data.forEach((item: any) => {
        const index = downloadItem.findIndex((dl) => dl.videoId === item.id);
        if (index >= 0) {
          updatingItem[index].progress = item.progress;
          updatingItem[index].status = item.status;
          updatingItem[index].fileName = item.fileName;
          updatingItem[index].error = item.error;
          if (item.status === 'Finished') {
            axios.delete(`/cleardownloading`, { params: { id: item.id } }).then((res) => {
              console.log(res.data);
            });
            updatingItem[index].downloaded = 'YES';
            setDownloadedItems([...downloadedItems, item.fileName]);
          }
        }
      });
      if (res.data.every((item: VideoItem) => item.status === 'Finished')) {
        setTick(0);
      }
      setDownloadItem([...updatingItem]);
    });
  };

  const clearItem = (item: string) => {
    const index = downloadItem.findIndex((dl) => dl.videoId === item);
    const updatedArray = [...downloadItem];
    updatedArray.splice(index, 1);
    setDownloadItem(updatedArray);
  };

  useEffect(() => {
    if (tick === 0) return;

    const intervalId = setInterval(() => {
      setTick(tick + 1);
      getUpdates();
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  useEffect(() => {
    if (dl) {
      const updated: VideoItem[] = [];

      downloadItem.forEach((i) => {
        console.log('match');
        if (i.videoId === dl) {
          const freshI = i;
          freshI.downloaded = 'InProgress';

          updated.push(freshI);
        } else {
          updated.push(i);
        }
      });

      setDownloadItem(updated);
      getDownload(dl);
      setDl('');
    }
  }, [dl, downloadItem]);

  const fetchInfo = (url: string) => {
    if (url.length === 0) {
      setIsError('You tried searching nothing');
      return;
    }
    setUrlLoading(true);
    console.log(url);

    axios.get(`/details`, { params: { url: url } }).then((res) => {
      const vd = res.data.videoDetails;
      if (!vd) {
        setIsError('There was an error find the video');
        setUrlLoading(false);
        return;
      }
      if (downloadItem.some((i) => i.url === vd.video_url)) {
        console.log('matching Url');
        setIsError('Item already in the list');
        setUrlLoading(false);
        return;
      }

      const item: VideoItem = {
        url: vd.video_url,
        title: vd.title,
        thumbnail: vd.thumbnails,
        videoId: vd.videoId,
        length: vd.lengthSeconds,
        downloaded: 'NO',
        status: 'NotStarted',
        progress: 0,
        fileName: '',
        error: '',
      };

      setDownloadItem([...downloadItem, item]);
      setUrlLoading(false);
    });
  };

  const getDownload = (videoId: string) => {
    console.log(videoId);
    const index = downloadItem.findIndex((di) => di.videoId === videoId);
    const updated = downloadItem;
    updated[index].downloaded = 'InProgress';
    setDownloadItem(updated);

    axios.get(`/download`, { params: { url: videoId } }).then((res) => {
      updated[index].status = res.data.status;
      setDownloadItem(updated);
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
                  getDownload={() => setDl(dLItem.videoId)}
                  removeItem={(r) => clearItem(r)}
                />
              );
            })}
          </>
        )}
        {downloadedItems.length > 0 && (
          <CompletedList list={downloadedItems} clearList={() => setDownloadedItems([])} />
        )}
      </Stack>
    </>
  );
};

export default Downloader;
