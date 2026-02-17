import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Should I Apply? — AI Company Evaluator",
  description:
    "Enter a company's URL and get an AI-powered evaluation of their culture, funding, leadership, and market position before you apply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
