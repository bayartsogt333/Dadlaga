"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HEADERS, SOCIAL_LINKS } from "@/lib/config";
import useScrollPosition from "@/lib/use_scroll";
import { cn } from "@/lib/utils";
import { getTranslation } from "@/locale/common";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Line } from "./Line";
import { GetQuotesDialog } from "@/components/system/get_quotes";

const Header = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = searchParams?.get("locale") || "mn";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolledX = useScrollPosition();

  const MenuLink = ({ header, className }: { header: any; className?: string }) => (
    <Link
      href={
        !header.external
          ? { pathname: "/", query: { section: header.tag, locale: currentLocale } }
          : { pathname: header.tag, query: { locale: currentLocale } }
      }
      className="border-b border-b-transparent hover:border-b-white transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3">
        <p className={cn("text-white text-lg", className)}>
          {getTranslation(currentLocale, header.tag)}
        </p>
        <Line className="bg-[#ffffff7f] h-4 rotate-0 w-px mt-1" />
      </div>
    </Link>
  );

  const MenuItem = ({ header }: { header: any }) =>
    !header.children ? (
      <MenuLink key={`header-${header.tag}`} header={header} />
    ) : (
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger className="text-white border-b border-b-transparent hover:border-b-white transition-all duration-300 ease-in-out text-lg">
          <div className="flex items-center gap-3">
            {getTranslation(currentLocale, header.tag)}
            <Line className="bg-[#ffffff7f] h-4 rotate-0 w-px mt-1" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          {header.children.map((child: any) => (
            <MenuLink
              key={`sub-header-${header.tag}-${child.tag}`}
              header={child}
              className="text-black py-1 border-b border-b-transparent hover:border-b-[#06B6D4] transition-all duration-300 ease-in-out text-lg"
            />
          ))}
        </HoverCardContent>
      </HoverCard>
    );

  return (
    <header className="fixed top-0 right-0 w-full backdrop-blur-md z-20 bg-black/30">
      <div className={cn("transition-all duration-300", scrolledX > 0 ? "h-0" : "h-[100px]")}>
        <div
          className={cn(
            "bg-gray-900 lg:flex items-center justify-around px-20 py-[18px] w-full hidden absolute right-0 transition-all duration-300",
            scrolledX > 0 ? "-top-[100px]" : "top-0"
          )}
        >
          <Image src="/images/img_download1.png" alt="logo" width={150} height={50} />
          <div className="flex items-center gap-2">
            <Image src="/images/img_close.svg" alt="time" width={63} height={63} />
            <p className="text-base text-white leading-[135.02%]">
              {getTranslation(currentLocale, "haeder_time")}<br />
              {getTranslation(currentLocale, "haeder_time1")}
            </p>
          </div>
          <div className="flex items-center gap-3.5">
            <Image src="/images/img_lock.svg" alt="email" width={63} height={63} />
            <p className="text-base text-white leading-[135.02%]">
              {getTranslation(currentLocale, "email")}<br />office@til.mn
            </p>
          </div>
          <div className="flex items-center gap-3.5">
            <Button className="bg-[#101b55] border border-[#233651] rounded-full h-[63px] w-[63px]">
              <Image src="/images/img_call.svg" alt="phone" width={20} height={20} />
            </Button>
            <p className="text-base text-white leading-[135.02%]">
              {getTranslation(currentLocale, "phone")}<br />+976 70189889
            </p>
          </div>
        </div>
      </div>

      <div className="py-4 px-4 lg:px-20 flex items-center justify-between gap-4">
        <Link href={{ pathname: "/", query: { section: "hero" } }}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={85}
            height={85}
            className="object-cover w-full h-full block lg:hidden"
            priority
          />
        </Link>

        <div className="hidden lg:flex justify-between items-center w-full">
          {/* Header menu shifted to the right */}
          <div className="flex items-center gap-6 translate-x-[100px]">
            {HEADERS.map((header) => (
              <MenuItem key={`header-${header.tag}`} header={header} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <Link key={`social-${link.title}`} href={link.href}>
                <div className="aspect-square bg-white bg-opacity-20 p-2 rounded-md">
                  <Image
                    src={link.icon === "Facebook" ? "/svg/img_facebook.svg" : "/svg/img_link.svg"}
                    alt={link.icon}
                    width={24}
                    height={24}
                    className="w-5 h-5"
                  />
                </div>
              </Link>
            ))}

            <div className="flex items-center gap-3">
              <Select
                value={currentLocale}
                onValueChange={(value) => {
                  router.push(`/?locale=${value}`);
                }}
              >
                <SelectTrigger className="w-[60px] h-[40px] flex items-center justify-center">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mn">
                    <Image src="/svg/mn.svg" alt="Mongolia" width={24} height={16} />
                  </SelectItem>
                  <SelectItem value="en">
                    <Image src="/svg/en.svg" alt="English" width={24} height={16} />
                  </SelectItem>
                </SelectContent>
                {/* <div className="h-[40px] flex items-center">
                <GetQuotesDialog />
              </div> */}
                
              </Select>

              <div className="h-[40px] flex items-center">
                <GetQuotesDialog />
              </div>
              
            </div>
          </div>
        </div>

        <div className="block lg:hidden">
          <HamburgerMenu
            currentLocale={currentLocale}
            router={router}
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};

const HamburgerMenu = ({
  currentLocale,
  router,
  open,
  onOpenChange,
}: {
  currentLocale: string;
  router: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const currentPath = usePathname();

  const MenuLink = ({ header, className }: { header: any; className?: string }) => (
    <Link
      href={
        !header.external
          ? { pathname: "/", query: { section: header.tag, locale: currentLocale } }
          : { pathname: header.tag, query: { locale: currentLocale } }
      }
    >
      <p className={cn("text-black text-lg", className)}>{getTranslation(currentLocale, header.tag)}</p>
    </Link>
  );

  const MenuItem = ({ header }: { header: any }) =>
    !header.children ? (
      <MenuLink key={`header-${header.tag}`} header={header} />
    ) : (
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger className="text-black text-lg">
          {getTranslation(currentLocale, header.tag)}
        </HoverCardTrigger>
        <HoverCardContent>
          {header.children.map((child: any) => (
            <MenuLink
              key={`sub-header-${header.tag}-${child.tag}`}
              header={child}
              className="text-black"
            />
          ))}
        </HoverCardContent>
      </HoverCard>
    );

  return (
    <Drawer direction="bottom" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className="text-white">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="text-black pb-16 px-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            {HEADERS.map((header) => (
              <MenuItem key={`header-${header.tag}`} header={header} />
            ))}
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <Link key={`social-mobile-${link.title}`} href={link.href}>
                <div className="bg-black bg-opacity-20 p-2 rounded-md">
                  <Image
                    src={link.icon === "Facebook" ? "/svg/img_facebook.svg" : "/svg/img_link.svg"}
                    alt={link.icon}
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
            ))}
            <Select
              value={currentLocale}
              onValueChange={(value) => {
                router.push(`/?locale=${value}`);
              }}
            >
              <SelectTrigger className="w-[60px] h-[40px] flex items-center justify-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mn">
                  <Image src="/svg/mn.svg" width={24} height={16} alt="MN" />
                </SelectItem>
                <SelectItem value="en">
                  <Image src="/svg/en.svg" width={24} height={16} alt="EN" />
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="h-[60px] flex items-center">
              <GetQuotesDialog />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Header;
