import type { Metadata } from "next";
import { JetBrains_Mono, Caveat } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/reusable/ThemeProvider";
import TooltipProvider from "@/components/reusable/TooltipProvider";
import { CursorProvider } from "@/components/reusable/CustomCursor/CursorContext";
import CustomCursor from "@/components/reusable/CustomCursor";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solutions Architect Portfolio",
  description: "Senior Developer & Solutions Architect — solving complex systems problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grid-overlay">
        <ThemeProvider>
          <CursorProvider>
            {/* CustomCursor lives at the absolute root, outside page transitions,
                so it survives route changes and AnimatePresence exits. */}
            <CustomCursor />
            <TooltipProvider>{children}</TooltipProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
