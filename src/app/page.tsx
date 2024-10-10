import Image from "next/image";
import Navbar from "./navbar/navbar";
import Main from "./home/home";

export default function Home() {
  return (
    <div>
    <div className="nav">     
      <Navbar/>
    </div>
    <div className="main">
      <Main/>
    </div>
    </div>
  );
}
