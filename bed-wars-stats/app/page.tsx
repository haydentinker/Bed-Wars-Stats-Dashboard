"use client";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@heroui/card";
export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/player/${value}`);
    }
  };

  return (
    <Card
      isBlurred
      shadow="sm"
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl mx-auto w-full overflow-hidden p-4 sm:p-6 rounded-xl mb-10"
    >
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            View your Hypixel Bedwars Stats
          </h1>
          <h2 className="text-lg font-bold text-white">
            Start by searching the player's username
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            className="max-w-sm"
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            size="md"
            labelPlacement="outside"
            placeholder="Enter username"
            value={value}
            onValueChange={setValue}
            type="search"
          />
          <Button color="primary" size="sm" type="submit">
            Search
          </Button>
        </form>
        <Image
          isBlurred
          alt="HeroUI Album Cover"
          src="/bedwars-banner.png"
          width={400}
        />
      </section>
    </Card>
  );
}
