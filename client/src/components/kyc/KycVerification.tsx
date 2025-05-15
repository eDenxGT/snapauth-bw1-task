import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useFormik } from "formik";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { kycSchema } from "@/utils/validators/kyc.validator.schema";
import VideoSection from "./VideoSection";
import ImageSection from "./ImageSection";
import { Loader } from "lucide-react";

interface KycVerificationProps {
  onComplete: ({
    photoBlob,
    videoBlob,
  }: {
    photoBlob: Blob;
    videoBlob: Blob;
  }) => void;
  isLoading: boolean;
}

const KycVerification = ({ onComplete, isLoading }: KycVerificationProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [recordingTime, setRecordingTime] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: true,
      blobPropertyBag: { type: "video/mp4" },
      onStop: (_blobUrl, blob) => {
        formik.setFieldValue("videoBlob", blob);
        formik.setFieldTouched("videoBlob", true);
      },
      mediaRecorderOptions: {
        audioBitsPerSecond: 128000,
      },
    });

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (status === "recording") {
      // setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          const nextTime = prevTime + 1;
          if (nextTime >= 5) {
            stopRecording();
            return 5;
          }
          return nextTime;
        });
      }, 1000);
    } else if (status === "stopped") {
      setRecordingTime(0);
    }
  }, [status, stopRecording]);

  const formik = useFormik({
    initialValues: {
      photoBlob: null as Blob | null,
      videoBlob: null as Blob | null,
    },
    validationSchema: kycSchema,
    onSubmit: (values) => {
      if (!values.photoBlob || !values.videoBlob) {
        toast.error("Please capture both photo and video before submitting");
        return;
      }

      onComplete({ photoBlob: values.photoBlob, videoBlob: values.videoBlob });
    },
  });

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  const handleCaptureImage = () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      toast.error("Failed to capture photo. Please try again.");
      return;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setImageSrc(screenshot);
                formik.setFieldValue("photoBlob", blob);
                formik.setFieldTouched("photoBlob", true);
              }
            },
            "image/jpeg",
            0.95
          );
        }
      };
      img.src = screenshot;
    } else {
      setImageSrc(screenshot);
      fetch(screenshot)
        .then((res) => res.blob())
        .then((blob) => {
          formik.setFieldValue("photoBlob", blob);
          formik.setFieldTouched("photoBlob", true);
        });
    }
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleRetakeImage = () => {
    setImageSrc(null);
    formik.setFieldValue("photoBlob", null);
  };

  const handleRetakeVideo = () => {
    clearBlobUrl();
    formik.setFieldValue("videoBlob", null);
  };

  const isRecording = status === "recording";

  return (
    <div className="bg-[#1e1e1e] border border-[#333333] rounded-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-white mb-2">
        Complete Your KYC Verification
      </h1>
      <p className="text-[#9e9e9e] text-center mb-6">
        Please capture your photo and a short video (with audio) to complete
        your identity verification.
      </p>

      <div className="flex justify-center mb-6">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-lg border border-[#444] w-full max-w-xl"
        />
        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      {/* Photo and Video Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Photo Section */}
        <div className="space-y-4">
          <ImageSection
            imageSrc={imageSrc}
            handleCaptureImage={handleCaptureImage}
            handleRetakeImage={handleRetakeImage}
          />
          {formik.touched.photoBlob && formik.errors.photoBlob && !imageSrc && (
            <p className="text-[#ff4d4f] mt-2">
              {formik.errors.photoBlob as string}
            </p>
          )}
        </div>

        {/* Video Section */}
        <div className="space-y-4">
          <VideoSection
            mediaBlobUrl={mediaBlobUrl || null}
            isRecording={isRecording}
            recordingTime={recordingTime}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            handleRetakeVideo={handleRetakeVideo}
          />
          {formik.touched.videoBlob &&
            formik.errors.videoBlob &&
            !mediaBlobUrl && (
              <p className="text-[#ff4d4f] mt-2">
                {formik.errors.videoBlob as string}
              </p>
            )}
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-[#333] pt-6 flex justify-center">
        <Button
          onClick={() => formik.handleSubmit()}
          disabled={
            !formik.values.photoBlob || !formik.values.videoBlob || isLoading
          }
          className="bg-[#00b37e] hover:bg-[#00a070] text-white px-8 py-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4" />
          ) : (
            "Submit KYC Verification"
          )}
        </Button>
      </div>
    </div>
  );
};

export default KycVerification;
