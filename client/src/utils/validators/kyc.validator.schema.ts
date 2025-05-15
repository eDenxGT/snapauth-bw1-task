import * as Yup from "yup";

export const kycSchema = Yup.object({
    photoBlob: Yup.mixed().required("A photo is required"),
    videoBlob: Yup.mixed().required("A video recording is required"),
  });