import http from 'http';
import path from 'path';
import express from 'express';

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

console.log(path.join(path.dirname('.'), './public'));

app.get("/", express.static(path.join(path.dirname('.'), './public')));

import multer from 'multer';

const upload = multer({
    dest: path.join(path.dirname("."), "./image_files")
});

import { on_upload } from './modules/image_file_handler.js';

app.post(
    "/upload",
    upload.single("file"),
    on_upload
);