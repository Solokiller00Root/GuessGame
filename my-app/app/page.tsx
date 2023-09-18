import Header from "@/components/Header";
import AvailableLobbies from "@/components/AvailableLobbies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <AvailableLobbies />
      <Footer />
    </div>
  );
}
