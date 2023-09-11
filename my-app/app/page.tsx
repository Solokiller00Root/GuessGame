
import Header from "@/components/Header";
import AvailableLobbies from "@/components/AvailableLobbies";
import Footer from "@/components/Footer";
import { Dialog } from "@radix-ui/react-dialog";




export default function Home() {
  return (
    <div className="relative">
      <Header />
      <AvailableLobbies />
      <Footer />
    </div>
  );
}
