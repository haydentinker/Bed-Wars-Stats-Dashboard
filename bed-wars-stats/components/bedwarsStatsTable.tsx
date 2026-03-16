import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Select, SelectItem } from "@heroui/select";
import type { BedwarsProfile, BedwarsMode } from "../types";
import { SkinViewerComponent } from "./minecraftSkin";

const modes: { key: BedwarsMode; label: string }[] = [
  { key: "solo", label: "Solo" },
  { key: "doubles", label: "Doubles" },
  { key: "threes", label: "3v3v3v3" },
  { key: "fours", label: "4v4v4v4" },
  { key: "two_four", label: "4v4" },
];

export default function BedwarsStatsTable({
  profile,
  playerSkin,
}: {
  profile: BedwarsProfile;
  playerSkin: string;
}) {
  const [mode, setMode] = useState<BedwarsMode>("solo");

  const stats = profile.stats.modes[mode];

  const rows = [
    { stat: "Games Played", value: stats.gamesPlayed },
    { stat: "Wins", value: stats.wins },
    { stat: "Losses", value: stats.losses },
    {
      stat: "Winrate",
      value:
        stats.gamesPlayed > 0
          ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1) + "%"
          : "0%",
    },
    { stat: "Kills", value: stats.kills },
    { stat: "Deaths", value: stats.deaths },
    {
      stat: "KDR",
      value:
        stats.deaths > 0
          ? (stats.kills / stats.deaths).toFixed(2)
          : stats.kills,
    },
    { stat: "Final Kills", value: stats.finalKills },
    { stat: "Final Deaths", value: stats.finalDeaths },
    {
      stat: "FKDR",
      value:
        stats.finalDeaths > 0
          ? (stats.finalKills / stats.finalDeaths).toFixed(2)
          : stats.finalKills,
    },
    { stat: "Beds Broken", value: stats.bedsBroken },
    { stat: "Beds Lost", value: stats.bedsLost },
    { stat: "Void Kills", value: stats.voidKills },
    { stat: "Void Deaths", value: stats.voidDeaths },
    { stat: "Items Purchased", value: stats.itemsPurchased },
    { stat: "Resources Collected", value: stats.resourcesCollected },
  ];

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-10">
      {/* Mode Selector */}
      <Select
        label="Select BedWars Mode"
        selectedKeys={[mode]}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as BedwarsMode;
          setMode(selected);
        }}
      >
        {modes.map((mode) => (
          <SelectItem key={mode.key}>{mode.label}</SelectItem>
        ))}
      </Select>

      {/* Skin + Stats Table */}
      <div className="flex flex-col sm:flex-row sm:gap-6 gap-4 items-center sm:items-center">
        <div className="flex-shrink-0">
          <SkinViewerComponent skinUrl={playerSkin} />
        </div>

        <div className="overflow-x-auto w-full">
          <Table aria-label="Bedwars Mode Stats" className="min-w-[300px]">
            <TableHeader>
              <TableColumn>Statistic</TableColumn>
              <TableColumn>Value</TableColumn>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.stat}>
                  <TableCell>{row.stat}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
