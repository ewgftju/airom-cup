import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import LanguageProvider from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: "AIROM CUP — International Basketball Tournament",
  description: "Международные баскетбольные турниры AIROM CUP в Атырау.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="light"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          id="airom-theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("airom-cup-theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
      </body>
    </html>
  );
}
