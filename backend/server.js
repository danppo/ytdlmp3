const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ytdl = require('ytdl-core');
const Ymp3 = require('./index');
// const y = new Ymp3();

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const downloading = {};

app.get('/api/details', (req, res) => {
  const url = req.query.url;
  console.log(url);

  ytdl
    .getInfo(url)
    .then((info) => {
      console.log('direct info');

      res.json(info);
    })
    .catch((e) => {
      res.json(e);
    });
});

app.get('/api/download', (req, res) => {
  const y = new Ymp3();
  const id = req.query.url;
  console.log('url - ' + id);
  const downloadingItem = {
    status: 'Starting',
    id,
    progress: 0,
    fileName: '',
    error: '',
  };
  downloading[id] = downloadingItem;

  y.Download(id, '')
    .then((videoInfo) => {
      res.json(downloading[id]);
    })
    .catch((e) => console.log(e));

  y.on('start', function (commandLine) {
    console.log(commandLine);
  });

  y.on('progress', function (progress) {
    const id = progress.videoId;
    downloading[id].status = 'Downloading';
    downloading[id].progress = progress.percent;
  });

  y.on('finish', function (fileName) {
    downloading[id].status = 'Finished';
    downloading[id].progress = 100;
    downloading[id].fileName = fileName;
  });

  y.on('error', function (e) {
    downloading[id].status = 'Error';
    downloading[id].error = e;
    console.log(e);
  });
});

app.get('/api/downloading', (req, res) => {
  res.json(Object.values(downloading));
});
app.delete('/api/cleardownloading', (req, res) => {
  const id = req.query.id;
  delete downloading[id];
  res.json(Object.values(downloading));
});

//   // sending 404 when not found something is a good practice
//   res.status(404).send('Book not found');
// });

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
