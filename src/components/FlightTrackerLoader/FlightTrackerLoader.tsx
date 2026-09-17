import "./css/FlightTrackerLoader.css";
import { useEffect, useState } from "react";

type FlightTrackerLoaderProps = {
  visible: boolean;
};

const messages = [
  "Initializing FlightTracker",
  "Connecting to radar feed",
  "Loading flight paths",
  "Fetching airport data",
  "Syncing live positions",
  "Almost ready",
];

export default function FlightTrackerLoader({
  visible,
}: FlightTrackerLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
    }, 1500);

    return () => clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="ftrack-loader">
      <div className="ftrack-loader__radar">
        <div className="ftrack-loader__ring ftrack-loader__ring--1" />
        <div className="ftrack-loader__ring ftrack-loader__ring--2" />
        <div className="ftrack-loader__ring ftrack-loader__ring--3" />
        <div className="ftrack-loader__crosshair ftrack-loader__crosshair--h" />
        <div className="ftrack-loader__crosshair ftrack-loader__crosshair--v" />
        <div className="ftrack-loader__sweep" />

        <div className="ftrack-loader__plane-orbit">
          <div className="ftrack-loader__plane">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

        <div className="ftrack-loader__blip ftrack-loader__blip--1" />
        <div className="ftrack-loader__blip ftrack-loader__blip--2" />
        <div className="ftrack-loader__blip ftrack-loader__blip--3" />
      </div>

      <div className="ftrack-loader__brand">
        <div className="ftrack-loader__title">FlightTracker</div>
        <div className="ftrack-loader__subtitle">Live Flight Intelligence</div>
      </div>

      <div className="ftrack-loader__progress">
        <div className="ftrack-loader__bar" />
      </div>

      <div className="ftrack-loader__status">{messages[messageIndex]}</div>
    </div>
  );
}
