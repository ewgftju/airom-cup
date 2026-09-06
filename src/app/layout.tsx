import type { Metadata } from "next";
import "./globals.css";
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
