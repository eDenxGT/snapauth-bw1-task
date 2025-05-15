import { useState } from "react";
import { Button } from "@/components/ui/button";
import KycVerification from "@/components/kyc/KycVerification";
import Header from "@/components/mainComponents/Header";
import { uploadKyc } from "@/services/kycService";
import { toast } from "sonner";
import { AxiosError } from "axios";

const KycVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showKyc, setShowKyc] = useState(true);

  const handleUploadKyc = async ({
    photoBlob,
    videoBlob,
  }: {
    photoBlob: Blob;
    videoBlob: Blob;
  }) => {
    if (!photoBlob || !videoBlob) {
      toast.error("Please capture both photo and video before submitting");
      return;
    }
    try {
      const photoFile = new File([photoBlob], "kyc-photo.jpg", {
        type: "image/jpeg",
      });

      const videoFile = new File([videoBlob], "kyc-video.mp4", {
        type: "video/mp4",
      });

      const formData = new FormData();
      formData.append("photoBlob", photoFile);
      formData.append("videoBlob", videoFile);

      setIsLoading(true);
      const response = await uploadKyc(formData);

      toast.success(response.message);
      setShowKyc(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-4 mt-16 md:p-6">
        {showKyc ? (
          <KycVerification onComplete={handleUploadKyc} isLoading={isLoading} />
        ) : (
          <div className="text-center p-10 bg-[#1e1e1e] rounded-lg border border-[#333333]">
            <h1 className="text-2xl font-bold mb-4">Verification Complete!</h1>
            <p className="text-[#9e9e9e] mb-6">
              Thank you for completing your identity verification. Your account
              is now fully activated.
            </p>
            <Button
              onClick={() => setShowKyc(true)}
              className="bg-[#00b37e] hover:bg-[#00a070] text-white"
            >
              Verify Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerificationPage;
