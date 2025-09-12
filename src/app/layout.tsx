import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/index.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";

const font = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madi",
  description: "Condominium administration and managment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bg-1">
      <body className={font.className}>
        <NextIntlClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
