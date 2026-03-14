import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalSearch } from "@/components/layout/global-search";
import { Bell, MessageSquare, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/d365/atoms/icon";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dealer365",
  description: "Next Generation Dealership OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <TooltipProvider>
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="h-14 border-b border-border/40 bg-background flex items-center justify-between px-4 shrink-0 transition-all duration-300 z-20">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-px bg-border/60" />
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
                      Command Console
                    </div>
                  </div>

                  <div className="flex-1 flex justify-center px-8">
                    <GlobalSearch />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted relative">
                      <Icon icon={MessageSquare} size={16} />
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted">
                      <Icon icon={Bell} size={16} />
                    </Button>
                    <div className="h-4 w-px bg-border/60 mx-1" />
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted">
                      <Icon icon={SettingsIcon} size={16} />
                    </Button>
                    <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/40">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                        MR
                      </div>
                    </div>
                  </div>
                </header>
                <main className="flex-1 overflow-auto bg-muted/10">
                  {children}
                </main>
              </div>
            </TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
