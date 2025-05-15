import { Button } from "../ui/button";
import { Camera, RefreshCw } from "lucide-react";

const ImageSection = ({
  imageSrc,
  handleCaptureImage,
  handleRetakeImage,
}: {
  imageSrc: string | null;
  handleCaptureImage: () => void;
  handleRetakeImage: () => void;
}) => {
  return (
    <>
      <h2 className="text-xl font-medium text-white">
        {!imageSrc ? "Step 1: Capture Your Photo" : "Captured Photo"}
      </h2>
      {!imageSrc ? (
        <Button
          onClick={handleCaptureImage}
          className="bg-[#00b37e] hover:bg-[#00a070] text-white w-full"
          type="button"
        >
          <Camera className="mr-2 h-4 w-4" />
          Capture Photo
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-[#444] w-full">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Captured"
              className="w-full max-h-54.5 object-cover"
            />
          </div>
          <Button
            onClick={handleRetakeImage}
            variant="outline"
            className="border-[#444444] hover:bg-[#333333] text-white w-full"
            type="button"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Photo
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageSection;
