import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/common/Navbar";
import ApolloProvider from "@/components/providers/apollo-provider";
import { Toaster } from "@/components/ui/toaster";
import ConfirmAlert from "@/components/common/ConfirmAlert";
import ReduxProvider from "@/components/providers/redux-provider";
import ReduxContextProvider from "@/components/providers/redux-context-provider";

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
                <div className="flex flex-col min-h-screen">
                  <ConfirmAlert />
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                  <Toaster />
                </div>
              </ReduxContextProvider>
            </ReduxProvider>
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
