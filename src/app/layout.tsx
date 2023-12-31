import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer
      ></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>

      <body className={inter.className}>
        <div className="py-5 px-3 [&>*]:p-3 [&>*]:hover:border [&>*]:mx-3 text-2xl">
          <Link href="/map/simpleMap">simple map</Link>
          <Link href="/map/hoverMap"> hover map</Link>
          <Link href="/googleMap"> cluster map</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
