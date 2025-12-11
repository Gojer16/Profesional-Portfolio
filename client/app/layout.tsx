import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SchemaMarkup } from "./components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.className}`}>
        {children}
        <SchemaMarkup />
      </body>
    </html>
  );
}
