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

export default function AppNavbar({setCreateProfileModal, createProfileModal}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Active Incidents"); // Default active item

  const menuItems = ["Report Incident", "Active Incidents", "Profile"];

  const handleItemClick = (item) => {
    setActiveItem(item);
    if(item == "Profile"){
      console.log("hello")
      setCreateProfileModal(true);
      console.log(createProfileModal)
    }else if (item === "Report Incident") {
      window.location.href = "/reportIncident"; 
    }else if (item == "Active Incidents"){
      window.location.href = "/campaigns"
    }
  };

  return (
    <Navbar className="h-20" onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
          <img src={logo} className="h-16 w-16 mr-2" alt="" />
          <p className="font-bold text-xl text-inherit">Hope</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8 cursor-pointer" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={activeItem === item}>
            <Link
              color={activeItem === item ? "primary" : "foreground"}
              onPress={() => handleItemClick(item)}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton showBalance={false} label="Sign in" />
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
              onPress={() => handleItemClick(item)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
