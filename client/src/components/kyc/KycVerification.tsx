import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Camera, Video, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface KycVerificationProps {
  onComplete: () => void;
}

const KycVerification = ({ onComplete }: KycVerificationProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const validationSchema = Yup.object({
    photoBlob: Yup.mixed().required("A photo is required"),
    videoBlob: Yup.mixed().required("A video recording is required"),
  });

  const formik = useFormik({
    initialValues: {
      photoBlob: null as Blob | null,
      videoBlob: null as Blob | null,
    },
    validationSchema,
    onSubmit: (values) => {
      if (!values.photoBlob || !values.videoBlob) {
        toast.error("Please capture both photo and video before submitting");
        return;
      }

      // Here you would typically send the data to your API
      // const formData = new FormData();
      // formData.append("photo", values.photoBlob);
      // formData.append("video", values.videoBlob);
      // fetch('/api/upload-kyc', { method: 'POST', body: formData })

      // Simulate API call
      toast.success("KYC verification submitted successfully");
      setTimeout(onComplete, 1500);
    },
  });

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setRecordedChunks([]);
    setRecordingTime(0);

    const stream = webcamRef.current?.video?.srcObject as MediaStream;
    if (!stream) return;

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    // Set up data available handler
    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    });

    // Start recording
    mediaRecorderRef.current.start();

    // Start timer
    const interval = window.setInterval(() => {
      setRecordingTime((prevTime) => {
        const newTime = prevTime + 1;
        // Auto-stop at 10 seconds
        if (newTime >= 10) {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            handleStopCaptureClick();
          }
          return 10;
        }
        return newTime;
      });
    }, 1000);
    setTimerInterval(interval);
  }, [webcamRef]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      
      // Clear timer
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      
      setCapturing(false);
    }
  }, [timerInterval]);

  // Process recorded chunks when they're available
  useEffect(() => {
    if (!capturing && recordedChunks.length > 0) {
      const videoBlob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoSrc(videoUrl);
      formik.setFieldValue("videoBlob", videoBlob);
    }
  }, [capturing, recordedChunks, formik]);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);
        
        // Convert base64 to blob
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            formik.setFieldValue("photoBlob", blob);
          });
      }
    }
  }, [webcamRef, formik]);

  const retakePhoto = () => {
    setImageSrc(null);
    formik.setFieldValue("photoBlob", null);
  };

  const retakeVideo = () => {
    setVideoSrc(null);
    setRecordedChunks([]);
    formik.setFieldValue("videoBlob", null);
  };

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg overflow-hidden">
      <div className="p-6 border-b border-[#333333]">
        <h1 className="text-2xl font-bold text-center text-white">
          Complete Your KYC Verification
        </h1>
        <p className="text-[#9e9e9e] text-center mt-2">
          Please capture your photo and a short video (with audio) to complete your identity verification.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 text-white">Step 1: Capture Your Photo</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              {!imageSrc ? (
                <div className="bg-[#333333] rounded-lg overflow-hidden">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-auto"
                  />
                  <div className="p-4 flex justify-center">
                    <Button
                      onClick={captureImage}
                      className="bg-[#00b37e] hover:bg-[#00a070] text-white"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Capture Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#333333] rounded-lg overflow-hidden">
                  <img src={imageSrc} alt="Captured" className="w-full h-auto" />
                  <div className="p-4 flex justify-center">
                    <Button
                      onClick={retakePhoto}
                      variant="outline"
                      className="border-[#444444] bg-[#333333] hover:bg-[#444444] text-white"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retake Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {formik.errors.photoBlob && formik.touched.photoBlob && (
            <p className="mt-2 text-[#ff4d4f]">{formik.errors.photoBlob as string}</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 text-white">Step 2: Record a Short Video</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              {!videoSrc ? (
                <div className="bg-[#333333] rounded-lg overflow-hidden">
                  <Webcam
                    audio={true}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    className="w-full h-auto"
                  />
                  <div className="p-4 flex justify-center items-center flex-col">
                    {capturing ? (
                      <div className="mb-4 w-full">
                        <span className="text-[#ff4d4f] font-semibold">Recording: {recordingTime} seconds</span>
                        <div className="w-full bg-[#444444] h-2 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="bg-[#ff4d4f] h-full rounded-full" 
                            style={{ width: `${(recordingTime / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : null}
                    
                    {capturing ? (
                      <Button
                        onClick={handleStopCaptureClick}
                        className="bg-[#ff4d4f] hover:bg-[#ff3333] text-white"
                      >
                        Stop Recording
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStartCaptureClick}
                        className="bg-[#00b37e] hover:bg-[#00a070] text-white"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Record Video (5-10 sec)
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#333333] rounded-lg overflow-hidden">
                  <video
                    src={videoSrc}
                    controls
                    className="w-full h-auto"
                  />
                  <div className="p-4 flex justify-center">
                    <Button
                      onClick={retakeVideo}
                      variant="outline"
                      className="border-[#444444] bg-[#333333] hover:bg-[#444444] text-white"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retake Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {formik.errors.videoBlob && formik.touched.videoBlob && (
            <p className="mt-2 text-[#ff4d4f]">{formik.errors.videoBlob as string}</p>
          )}
        </div>

        <div className="border-t border-[#333333] pt-6 flex justify-center">
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || !formik.values.photoBlob || !formik.values.videoBlob}
            className="bg-[#00b37e] hover:bg-[#00a070] text-white px-8 py-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit KYC Verification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KycVerification;