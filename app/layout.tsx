import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "박진솔 | 개발자 포트폴리오",
  description: "안드로이드 앱개발자, 박진솔의 포트폴리오입니다.",
  metadataBase: new URL("https://jjeansp9.github.io"),
  openGraph: {
    title: "개발자 박진솔 포트폴리오",
    description: "안드로이드 개발자, 박진솔의 포트폴리오입니다.",
    url: "https://jjeansp9.github.io",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/icon.png" },
      { url: "/images/icon.png", type: "image/x-icon" },
    ],
    shortcut: [{ url: "/images/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
} 