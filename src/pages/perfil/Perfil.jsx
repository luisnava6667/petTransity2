import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import Form from "./components/Form";
import FormRefugio from "./components/FormRefugio";

const Perfil = () => {
  const role = localStorage.getItem("role");
   useEffect(() => {
     document.title = 'Perfil'
   }, [])
  return (
    <main className="h-screen bg-[#CCC4BB] flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <div className="">
          <TopBar />
        </div>
        {role === "refugio" ? <FormRefugio /> : <Form />}
        <div className="flex justify-center "></div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center "></div>
      </div>
    </main>
  );
};

export default Perfil;
