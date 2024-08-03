import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import localFont from "next/font/local";
const myFont = localFont({
  src: "../../fonts/jetbrainsmono-regular.woff2",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhisperMe",
  description: "Simple, secure, anonymous",
};

export default function RootLayout({ children }) {
  return (
    <>
    <NavBar></NavBar>
        <div className="mt-[100px] min-h-[100%] md:mt-[130px]">{children}</div>
    </>
        
    
  );
}
