import type { Metadata } from "next";
import { Poppins, EB_Garamond } from "next/font/google";
import "./globals.css";
import Provider from "@/provider";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
});
const serif = EB_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "FORTEEN — Sport Club, Tashkent",
  description:
    "A sport club built around movement, discipline and community. Tashkent, Uzbekistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable}`}
    >
      <Provider>
        <body className="font-sans w-full h-full flex flex-col antialiased">
          {children}
        </body>
      </Provider>
    </html>
  );
}
