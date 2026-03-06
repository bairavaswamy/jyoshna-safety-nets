import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Jyoshna Safety Nets",
  description: "Jyoshna Safety Net Services",
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
