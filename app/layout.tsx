import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elysium-energy.com/"),
  title: {
    default: "Elysium Energy",
    template: "%s - Elysium Energy",
  },
  description: "Advancing hydrogen possibilities with Elysium Energy.",
  icons: {
    icon: "/next.svg",
  },
  openGraph: {
    title: "Elysium Energy",
    description: "Advancing hydrogen possibilities with Elysium Energy.",
    url: "https://www.elysium-energy.com/",
    images: [
      {
        url: "/elysium-energy-logo.png",
        width: 1200,
        height: 630,
        alt: "Elysium Energy Logo",
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
        style={{
          backgroundColor: "transparent",
        }}
      >
        {children}
      </body>
    </html>
  );
}
