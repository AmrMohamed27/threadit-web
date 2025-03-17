"use client";
import { ChevronRight } from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  EXPLORE_COMMUNITIES_COUNT,
  sidebarCollapsibles,
  sidebarHeader,
} from "@/constants";
import { usePathname } from "next/navigation";
import {
  useGetExploreCommunitiesQuery,
  useGetUserCommunitiesQuery,
} from "@/generated/graphql";
import AvatarWrapper from "./AvatarWrapper";
import { cn, getDefaultAvatar } from "@/lib/utils";
import SidebarLoading from "../loading/SidebarLoading";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { open, openMobile } = useSidebar();
  const {
    data: userCommunities,
    loading: userCommunitiesLoading,
    error: userCommunitiesError,
  } = useGetUserCommunitiesQuery();
  const {
    data: exploreCommunitiesResult,
    loading: exploreLoading,
    error: exploreError,
  } = useGetExploreCommunitiesQuery({
    variables: {
      limit: EXPLORE_COMMUNITIES_COUNT,
    },
  });
  if (userCommunitiesLoading || exploreLoading) return <SidebarLoading />;
  if (userCommunitiesError || exploreError)
    return (
      <div>
        {userCommunitiesError?.message ??
          exploreError?.message ??
          "Error loading communities"}
      </div>
    );

  const communities =
    userCommunities?.getUserCommunities.communitiesArray ?? [];
  const exploreCommunities =
    exploreCommunitiesResult?.getExploreCommunities.communitiesArray ?? [];
  return (
    <Sidebar {...props} className="px-4">
      <SidebarHeader className="flex flex-row justify-between items-center w-full">
        <Link href="/" className="font-bold text-2xl">
          Threadit
        </Link>
        <SidebarTrigger className={cn(open || openMobile ? "" : "hidden")} />
      </SidebarHeader>
      <SidebarContent className="gap-0 mt-12">
        <SidebarGroupContent>
          {/* Header */}
          <SidebarMenu className="flex flex-col gap-2">
            {sidebarHeader.map(({ id, title, href, icon: Icon }) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton
                  isActive={href === pathname.replace("%20", " ")}
                  asChild
                >
                  <Link
                    href={href}
                    className="flex flex-row items-center gap-2 hover:bg-muted/20 px-6"
                  >
                    <Icon className="w-12 h-12" />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {sidebarCollapsibles.map(({ id, title, children }) => (
          <Collapsible
            key={id}
            title={title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label hover:bg-sidebar-accent text-sidebar-foreground text-sm hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="hover:bg-muted/20 px-4 !rounded-full text-accent uppercase">
                  {title}{" "}
                  <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {children.map(({ id, href, title, icon: Icon }) => (
                      <div key={id} className="flex flex-col gap-2">
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            isActive={href === pathname.replace("%20", " ")}
                            asChild
                          >
                            <Link
                              href={href}
                              className="flex flex-row items-center gap-2 hover:bg-muted/20 px-4 w-full"
                            >
                              <Icon className="w-12 h-12" />
                              <span>{title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        {/* Communities */}
                        {title === "Create a community" && (
                          <div className="flex flex-col gap-2">
                            {communities.map(({ id, name, image }) => {
                              const href = `/c/${name}`;
                              return (
                                <SidebarMenuItem key={id}>
                                  <SidebarMenuButton
                                    isActive={
                                      href === pathname.replace("%20", " ")
                                    }
                                    asChild
                                  >
                                    <Link
                                      href={href}
                                      className="flex flex-row items-center gap-2 hover:bg-muted/20 p-4"
                                    >
                                      <AvatarWrapper
                                        src={
                                          image ?? getDefaultAvatar({ name })
                                        }
                                        alt={name}
                                        className="w-6 h-6"
                                      />
                                      <span>c/{name}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                    {title === "Explore" &&
                      exploreCommunities.map(({ id, name, image }) => (
                        <SidebarMenuItem key={id}>
                          <SidebarMenuButton
                            isActive={
                              pathname.replace("%20", " ") === `/c/${name}`
                            }
                            asChild
                          >
                            <Link
                              href={`/c/${name}`}
                              className="flex flex-row items-center gap-2 hover:bg-muted/20 px-4"
                            >
                              <AvatarWrapper
                                src={image ?? getDefaultAvatar({ name })}
                                alt={name}
                                className="w-6 h-6"
                              />
                              <span>c/{name}</span>
                            </Link>
                          </SidebarMenuButton>{" "}
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
