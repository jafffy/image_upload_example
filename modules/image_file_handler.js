import fs from 'fs';
import path from 'path';

export const name = 'image_file_handler';

const handleError = (err, res) => {
    res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

export function on_upload(req, res) {
    const tempPath = req.file.path;
    const targetPath = path.join(path.dirname("."), "./image_files/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
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
                .end("Only .png files are allowed!");
        })
    }
}