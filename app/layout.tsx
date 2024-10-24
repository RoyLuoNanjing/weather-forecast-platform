import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.baidu.com/"),
  title: {
    default: "Weather Forecast",
    template: "%s - Weather Forecast",
  },
  description: "Weather Forecast",
  icons: {
    icon: "/next.svg",
  },
  openGraph: {
    title: "Weather Forecast",
    description: "Weather Forecast",
    url: "https://www.baidu.com",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "Weather Forecast",
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
