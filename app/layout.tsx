import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import ApolloProvider from "@/components/providers/apollo-provider";
import { Toaster } from "@/components/ui/toaster";
import ConfirmAlert from "@/components/common/ConfirmAlert";
import ReduxProvider from "@/components/providers/redux-provider";
import ReduxContextProvider from "@/components/providers/redux-context-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import Footer from "@/components/common/Footer";

const funnel_display = Funnel_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threadit",
  description: "A place for deep discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${funnel_display.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>
            <ReduxProvider>
              <ReduxContextProvider>
                <SidebarProvider>
                  <NextSSRPlugin
                    /**
                     * The `extractRouterConfig` will extract **only** the route configs
                     * from the router to prevent additional information from being
                     * leaked to the client. The data passed to the client is the same
                     * as if you were to fetch `/api/uploadthing` directly.
                     */
                    routerConfig={extractRouterConfig(ourFileRouter)}
                  />
                  <AppSidebar />
                  <div className="relative flex flex-col flex-1 w-full min-h-screen">
                    <SidebarTrigger />
                    <Navbar />
                    <main className="flex flex-col flex-grow justify-center items-center mt-[56px]">
                      <ConfirmAlert />
                      {children}
                    </main>
                    <Footer />
                    <Toaster />
                  </div>
                </SidebarProvider>
              </ReduxContextProvider>
            </ReduxProvider>
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
