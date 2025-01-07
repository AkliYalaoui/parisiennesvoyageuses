import { Nunito } from "next/font/google";
import "../globals.css";

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "Parisiennes Voyageuses | %s",
    default: "Parisiennes Voyageuses | Official Admin Page",
  },
  description: "Parisiennes Voyageuses Official Website",
  keywords: "Instagram, Traveling, Voyage, Reels, Paris, Twins",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
