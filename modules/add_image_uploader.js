import fs from 'fs';
import path from 'path';

export const name = 'image_file_handler';

import multer from 'multer';

const upload = multer({
    dest: path.join(path.dirname("."), "./image_files")
});

const handleError = (err, res) => {
    res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

function on_upload(req, res) {
    const tempPath = req.file.path;
    const given_extension = path.extname(req.file.originalname).toLowerCase();

    if (given_extension === ".png" || given_extension === ".jpg") {
        const targetPath = path.join(path.dirname("."), "./image_files/image" + given_extension);
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res
                .status(403)
                .contentType("text/plain")
                .end("Only .png and .jpg files are allowed!");
        })
    }
}


export default function add_image_uploader(app, entity_config) {
    app.post(
        entity_config.api,
        upload.single(entity_config.type),
        on_upload
    );
}