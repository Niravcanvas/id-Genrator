import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ID Card Generator",
  description: "Generate 500+ professional ID cards in seconds with advanced customization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-azeret antialiased">
        {children}
      </body>
    </html>
  );
}