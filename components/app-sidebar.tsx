"use client";
import {
  ChevronDown,
  ChevronsLeftRight,
  ChevronUp,
  Home,
  ListTreeIcon,
  Rss,
  ShieldPlus,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/lib/provider/authProvider";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-mode";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { usePathname } from "next/navigation";

// List of events
const events = [
  {
    title: "Mest",
    link: "/dashboard/mest",
  },
  {
    title: "Proficuus'24",
    link: "/dashboard/proficuus24",
  },
];
// List of menu
const eventMenuItems = [
  {
    title: "Blog",
    url: "/dashboard/mest/blog",
    icon: Rss,
  },
  {
    title: "Home",
    url: "/dashboard/proficuus24",
    icon: Home,
  },
  {
    title: "Volunteers",
    url: "/dashboard/proficuus24/volunteers",
    icon: ShieldPlus,
  },
  {
    title: "Participants",
    url: "/dashboard/proficuus24/participants",
    icon: Users,
  },
];
export function AppSidebar() {
  const { user } = useAuth();
  const { toggleSidebar, state } = useSidebar();
  const pathname = usePathname();

  const handleEventSelect = (eventLink: string) => {
    window.location.href = eventLink; // Navigate to the selected event route
  };

  const logout = () => {
    signOut(auth);
    window.location.href = "/proficuus24/login";
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <ListTreeIcon
                    size={30}
                    className="bg-blue-400 w-8 h-8 text-white p-1 rounded-lg"
                  />
                  Select Event
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {events.map((event) => (
                  <DropdownMenuItem
                    key={event.title}
                    onClick={() => handleEventSelect(event.link)}
                  >
                    <span>{event.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => toggleSidebar()} asChild>
              <a>
                <ChevronsLeftRight />
                <span>Collapse</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {eventMenuItems
                .filter((item) => {
                  console.log(
                    item.url.split("/")[2],
                    " | ",
                    window.location.pathname.split("/")[2]
                  );

                  return (
                    item.url.split("/")[2] ===
                    window.location.pathname.split("/")[2]
                  );
                })
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem
            className={`flex ${
              state === "collapsed" ? "flex-col-reverse" : ""
            }`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant={"destructive"}
                    onClick={logout}
                    className="w-full"
                  >
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
