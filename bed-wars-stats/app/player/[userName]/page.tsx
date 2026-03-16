"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BedwarsProfile, parseBedwars } from "@/types";
import BedwarsStatsTable from "@/components/bedwarsStatsTable";
import { Card } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
export default function PlayerPage() {
  const params = useParams();
  const userName = params.userName;
  const [playerSkin, setPlayerSkin] = useState("");
  const [playerUuid, setPlayerUuid] = useState("");
  const [playerStats, setPlayerStats] = useState<BedwarsProfile>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!userName) return;

    setIsLoading(true);

    // Step 1: Fetch UUID
    fetch(`/api/playerSession/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        const uuid = data.id;
        setPlayerUuid(uuid);

        // Step 2: Fetch skin and stats in parallel
        return Promise.all([
          fetch(`/api/playerUuid/${uuid}`).then((res) => res.json()),
          fetch(`/api/hypixel/player/${uuid}`).then((res) => res.json()),
        ]);
      })
      .then(([skinData, statsData]) => {
        // Parse skin
        if (skinData.properties?.length > 0) {
          try {
            const skin = JSON.parse(atob(skinData.properties[0].value));
            setPlayerSkin(skin.textures.SKIN?.url || "");
          } catch (err) {
            console.error("Failed to parse skin:", err);
          }
        }

        // Parse stats
        setPlayerStats(parseBedwars(statsData.player.stats["Bedwars"]));
      })
      .catch((err) => console.error("Failed to fetch player data:", err))
      .finally(() => setIsLoading(false));
  }, [userName]);
  return (
    <Card
      isBlurred
      shadow="sm"
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl mx-auto w-full overflow-hidden p-4 sm:p-6 rounded-xl mb-10"
    >
      <section className="flex flex-col items-center justify-center gap-6 py-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {userName}'s Bedwars Stats
        </h1>

        <div className="w-full flex flex-col items-center gap-6">
          {isLoading && !playerStats ? (
            <Spinner />
          ) : (
            playerStats && (
              <div className="flex flex-col w-full gap-6">
                <BedwarsStatsTable
                  profile={playerStats}
                  playerSkin={playerSkin}
                />
              </div>
            )
          )}
        </div>
      </section>
    </Card>
  );
}
