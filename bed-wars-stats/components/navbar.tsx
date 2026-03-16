"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/player/${value}`);
    }
  };

  return (
    <HeroUINavbar position="sticky" className="bg-transparent">
      <NavbarContent
        justify="start"
        className="flex flex-wrap items-center gap-4 w-full"
      >
        <NavbarBrand
          onClick={() => {
            router.push("/");
          }}
        >
          <p className="font-bold text-white cursor-pointer text-lg sm:text-xl">
            Hypixel Bedwars Stats
          </p>
        </NavbarBrand>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 sm:flex-auto gap-2 items-center"
        >
          <Input
            className="flex-1"
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-white/20 rounded-md",
              input: "text-sm text-white placeholder-white/70",
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
      </NavbarContent>
    </HeroUINavbar>
  );
};
