import { RefreshCw, Video } from "lucide-react";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";

const VideoSection = ({
  mediaBlobUrl,
  isRecording,
  recordingTime,
  handleStartRecording,
  handleStopRecording,
  handleRetakeVideo,
}: {
  mediaBlobUrl: string | null;
  isRecording: boolean;
  recordingTime: number;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleRetakeVideo: () => void;
}) => {
  return (
    <>
      <h2 className="text-xl font-medium text-white">
        {!mediaBlobUrl ? "Step 2: Record a Short Video" : "Captured Video"}
      </h2>
      {!mediaBlobUrl ? (
        <div className="space-y-4">
          {isRecording && (
            <div className="text-[#ff4d4f] font-medium">
              Recording... {recordingTime}s
              <div className="w-full bg-[#444] h-2 rounded mt-1">
                <div
                  className="bg-[#ff4d4f] h-full rounded transition-all duration-1000"
                  style={{ width: `${(recordingTime / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          <Button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isRecording}
            className={`w-full ${
              isRecording
                ? "bg-[#ff4d4f] hover:bg-[#ff3333] text-white"
                : "bg-[#00b37e] hover:bg-[#00a070] text-white"
            }`}
            type="button"
          >
            <Video className="mr-2 h-4 w-4" />
            {isRecording ? "Recording..." : "Record Video (5s)"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-[#444] w-full">
            <ReactPlayer
              url={mediaBlobUrl}
              controls
              width="100%"
              height="auto"
            />
          </div>
          <Button
            onClick={handleRetakeVideo}
            variant="outline"
            className="border-[#444444] hover:bg-[#333333] text-white w-full"
            type="button"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Video
          </Button>
        </div>
      )}
    </>
  );
};

export default VideoSection;
