import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
export const kycUpload = upload.fields([
  { name: "photoBlob", maxCount: 1 },
  { name: "videoBlob", maxCount: 1 }
]);