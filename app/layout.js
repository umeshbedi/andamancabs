import { Poppins } from "next/font/google";
import "./globals.css";
import { FaWhatsapp } from "react-icons/fa";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Andaman Cabs | Best Cab Rental Agency in Andaman's",
  description: "Andaman Cabs offers wide range of vehicles to book nearby your location for best fares.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} relative`}>
        <a
          href="https://wa.me/919933237775?text=Hi%20Andaman%20Cabs%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20know%20more%20about%20your%20cab%20services."
          target="_blank"
          className="fixed bottom-4 left-4 rounded-full p-3 bg-green-600 z-50 flex items-center gap-2"
        >
          <FaWhatsapp size={25} color="white" />
        </a>
        {children}
      </body>
    </html>
  );
}
