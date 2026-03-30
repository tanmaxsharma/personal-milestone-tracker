import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milestone Tracker",
  description: "Track your personal achievements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}