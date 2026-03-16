import React, { useEffect, useRef } from "react";
import { MinecraftSkinViewer } from "@wiicamp/react-minecraft-skin-viewer";

// Define the props interface for clarity in TypeScript
interface SkinViewerProps {
  skinUrl: string; // The URL to the 64x64 PNG skin file
}

export const SkinViewerComponent = ({ skinUrl }: SkinViewerProps) => {
  return (
    <div
      style={{
        width: 320,
        height: 480,
        background: "linear-gradient(135deg, #7f0a0a 0%, #3b82f6 100%)", // match body gradient
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="rounded-lg"
    >
      <MinecraftSkinViewer
        skin={skinUrl}
        width={320}
        height={500}
        background="#15161c"
        walk={true}
        control
      />
    </div>
  );
};
