import { Nunito } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const nunito = Nunito({
  weight : ["400", "700"],
  subsets : ["latin"]
})


export const metadata = {
  title: "Parisiennes Voyageuses | Official Home Page",
  description: "Parisiennes Voyageuses Official Website",
  keywords : "Instagram, Traveling, Voyage, Reels, Paris, Twins"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>       
        {children}
        <Footer/>
      </body>
    </html>
  );
}
