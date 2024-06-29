"use client";

import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  Navbar as NextuiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();

  const watchlistPath = "/movies/watchlist";
  const homePath = "/movies/search";

  return (
    <NextuiNavbar isBordered maxWidth="full">
      <NavbarBrand>
        <Link href={homePath} className="text-xl font-bold text-inherit">
          Home
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="hidden lg:flex" isActive>
          <Link
            aria-current="page"
            href={watchlistPath}
            color={pathName === watchlistPath ? "primary" : "foreground"}
          >
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src={
                session?.user?.image ||
                "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem onClick={() => signOut()} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextuiNavbar>
  );
};

export default Navbar;
