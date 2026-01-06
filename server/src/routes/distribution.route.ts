import { Router } from "express";
import { Distribution } from "../controllers/distribution.controller";
import { protect } from "../middleware/auth.middleware";
import multer from "multer";
import path from "path";
import fs from 'fs';

const distributionRouter = Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        cb(null, `${ timestamp }-${ file.originalname }`); //Original file name with timestamp
    }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 } }) // 10 KB

distributionRouter.post('/distribution', protect, upload.single('file'), Distribution);

export default distributionRouter;