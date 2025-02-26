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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { sidebarCollapsibles, sidebarHeader } from "@/constants";
import { usePathname } from "next/navigation";
import { useGetUserCommunitiesQuery } from "@/generated/graphql";
import AvatarWrapper from "./AvatarWrapper";
import { getDefaultAvatar } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data, loading, error } = useGetUserCommunitiesQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const communities = data?.getUserCommunities.communitiesArray ?? [];
  return (
    <Sidebar {...props} className="px-4">
      <SidebarHeader>
        <Link href="/" className="font-bold text-2xl">
          Threadit
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0 mt-12">
        <SidebarGroupContent>
          {/* Header */}
          <SidebarMenu className="flex flex-col gap-2">
            {sidebarHeader.map(({ id, title, href, icon: Icon }) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton isActive={href === pathname} asChild>
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
                            isActive={href === pathname}
                            className="flex flex-row items-center gap-2 hover:bg-muted/20 px-4"
                          >
                            <>
                              <Icon className="w-12 h-12" />
                              <Link href={href}>{title}</Link>
                            </>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        {title === "Create a community" && (
                          <div className="flex flex-col gap-2">
                            {communities.map(({ id, name, image }) => {
                              const href = `/c/${name}`;
                              return (
                                <SidebarMenuItem key={id}>
                                  <SidebarMenuButton
                                    isActive={href === pathname}
                                    className="flex flex-row items-center gap-2 hover:bg-muted/20 p-4"
                                  >
                                    <>
                                      <AvatarWrapper
                                        src={
                                          image ?? getDefaultAvatar({ name })
                                        }
                                        alt={name}
                                        className="w-6 h-6"
                                      />
                                      <Link href={href}>c/{name}</Link>
                                    </>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
