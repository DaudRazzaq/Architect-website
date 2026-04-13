import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aureon Studio — Interior Architecture & Refurbishment Design",
  description:
    "A London-based studio delivering interior architecture and refurbishment design with a calm, considered approach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
