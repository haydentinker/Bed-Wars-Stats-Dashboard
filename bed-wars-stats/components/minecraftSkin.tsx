import React from "react";
import { MinecraftSkinViewer } from "@wiicamp/react-minecraft-skin-viewer";

// Define the props interface for clarity in TypeScript
interface SkinViewerProps {
  skinUrl: string; // The URL to the 64x64 PNG skin file
}

export const SkinViewerComponent = ({ skinUrl }: SkinViewerProps) => {
  return (
    <div style={{ width: 320, height: 480 }}>
      <MinecraftSkinViewer
        skin={skinUrl}
        width={320}
        height={480}
        background="black"
      />
    </div>
  );
};
