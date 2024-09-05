import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../../public/hope-logo.svg";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Active Incidents"); // Default active item

  const menuItems = ["Report Incident", "Active Incidents", "Profile"];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src={logo} className="h-12 w-12 mr-2" alt="" />
          <p className="font-bold text-inherit">Hope</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={activeItem === item}>
            <Link
              color={activeItem === item ? "primary" : "foreground"}
              href="#"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={activeItem === item ? "primary" : "foreground"}
              className="w-full"
              href="#"
              size="lg"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
