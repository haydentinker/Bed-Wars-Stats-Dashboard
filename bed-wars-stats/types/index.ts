import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type BedwarsMode =
  | "solo"
  | "doubles"
  | "threes"
  | "fours"
  | "two_four";

export interface BedwarsModeStats {
  gamesPlayed: number;
  wins: number;
  losses: number;

  kills: number;
  deaths: number;

  finalKills: number;
  finalDeaths: number;

  bedsBroken: number;
  bedsLost: number;

  voidKills: number;
  voidDeaths: number;

  itemsPurchased: number;
  resourcesCollected: number;
}

export interface BedwarsStats {
  coins: number;

  gamesPlayed: number;
  wins: number;
  losses: number;
  winstreak: number;

  kills: number;
  deaths: number;

  finalKills: number;
  finalDeaths: number;

  bedsBroken: number;
  bedsLost: number;

  voidKills: number;
  voidDeaths: number;

  resourcesCollected: number;

  itemsPurchased: number;
  permanentItemsPurchased: number;

  modes: Record<BedwarsMode, BedwarsModeStats>;
}

export interface CalculatedStats {
  winrate: number;
  fkdr: number;
  kdr: number;
}

export interface BedwarsProfile {
  stats: BedwarsStats;
  calculated: CalculatedStats;
}

const MODE_PREFIX: Record<BedwarsMode, string> = {
  solo: "eight_one",
  doubles: "eight_two",
  threes: "four_three",
  fours: "four_four",
  two_four: "two_four",
};


function safe(n: any): number {
  return typeof n === "number" ? n : 0;
}


function parseMode(api: any, prefix: string): BedwarsModeStats {
  return {
    gamesPlayed: safe(api[`${prefix}_games_played_bedwars`]),

    wins: safe(api[`${prefix}_wins_bedwars`]),
    losses: safe(api[`${prefix}_losses_bedwars`]),

    kills: safe(api[`${prefix}_kills_bedwars`]),
    deaths: safe(api[`${prefix}_deaths_bedwars`]),

    finalKills: safe(api[`${prefix}_final_kills_bedwars`]),
    finalDeaths: safe(api[`${prefix}_final_deaths_bedwars`]),

    bedsBroken: safe(api[`${prefix}_beds_broken_bedwars`]),
    bedsLost: safe(api[`${prefix}_beds_lost_bedwars`]),

    voidKills: safe(api[`${prefix}_void_kills_bedwars`]),
    voidDeaths: safe(api[`${prefix}_void_deaths_bedwars`]),

    itemsPurchased: safe(api[`${prefix}_items_purchased_bedwars`]),
    resourcesCollected: safe(api[`${prefix}_resources_collected_bedwars`])
  };
}

// -----------------------------
// Main parser
// -----------------------------

export function parseBedwars(api: any): BedwarsProfile {

  const modes: Record<BedwarsMode, BedwarsModeStats> = {
    solo: parseMode(api, MODE_PREFIX.solo),
    doubles: parseMode(api, MODE_PREFIX.doubles),
    threes: parseMode(api, MODE_PREFIX.threes),
    fours: parseMode(api, MODE_PREFIX.fours),
    two_four: parseMode(api, MODE_PREFIX.two_four),
  };

  const stats: BedwarsStats = {
    coins: safe(api.coins),

    gamesPlayed: safe(api.games_played_bedwars),
    wins: safe(api.wins_bedwars),
    losses: safe(api.losses_bedwars),
    winstreak: safe(api.winstreak),

    kills: safe(api.kills_bedwars),
    deaths: safe(api.deaths_bedwars),

    finalKills: safe(api.final_kills_bedwars),
    finalDeaths: safe(api.final_deaths_bedwars),

    bedsBroken: safe(api.beds_broken_bedwars),
    bedsLost: safe(api.beds_lost_bedwars),

    voidKills: safe(api.void_kills_bedwars),
    voidDeaths: safe(api.void_deaths_bedwars),

    resourcesCollected: safe(api.resources_collected_bedwars),

    itemsPurchased: safe(api.items_purchased_bedwars),
    permanentItemsPurchased: safe(api.permanent_items_purchased_bedwars),

    modes
  };

  const calculated: CalculatedStats = {
    winrate: stats.gamesPlayed ? stats.wins / stats.gamesPlayed : 0,
    fkdr: stats.finalDeaths ? stats.finalKills / stats.finalDeaths : 0,
    kdr: stats.deaths ? stats.kills / stats.deaths : 0
  };

  return { stats, calculated };
}