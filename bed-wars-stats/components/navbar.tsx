import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <HeroUINavbar position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">Hypixel Bedwars Stats</p>
        </NavbarBrand>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
