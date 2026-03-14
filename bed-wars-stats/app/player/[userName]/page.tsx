"use client";

import { useEffect, useState } from "react";
import { SkinViewerComponent } from "@/components/minecraftSkin";
import { useParams } from "next/navigation";

export default function PlayerPage() {
  const params = useParams();
  const userName = params.userName;
  const [playerSkin, setPlayerSkin] = useState("");
  const [playerUuid, setPlayerUuid] = useState("");

  useEffect(() => {
    if (!userName) return;

    fetch(`/api/playerSession/${userName}`)
      .then((res) => res.json())
      .then((data) => setPlayerUuid(data.id))
      .catch((err) => console.error("Failed to fetch player UUID:", err));
  }, [userName]);

  useEffect(() => {
    if (!playerUuid) return;

    fetch(`/api/playerUuid/${playerUuid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.properties?.length > 0) {
          try {
            const skin = JSON.parse(atob(data.properties[0].value));
            setPlayerSkin(skin.textures.SKIN?.url || "");
          } catch (err) {
            console.error("Failed to parse skin:", err);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch skin:", err));

    fetch(`/api/hypixel/player/${playerUuid}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Failed to fetch player data:", err));
  }, [playerUuid]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-xl font-bold">{userName}'s Bedwars Stats</h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        {playerSkin ? (
          <SkinViewerComponent skinUrl={playerSkin} />
        ) : (
          <p>Loading skin...</p>
        )}
      </div>
    </section>
  );
}
