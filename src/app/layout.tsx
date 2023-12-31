import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import "./imports.d";
import "./globals.d";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "λ",
  description: "Generated by create next app",
};

// eslint-disable-next-line functional/prefer-immutable-types
export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <>{children}</>
      </body>
    </html>
  );
}
