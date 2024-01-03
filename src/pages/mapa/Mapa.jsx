/* eslint-disable react-hooks/exhaustive-deps */

// import spinner from '@/assets/spinner.svg'
import useRefugio from "../../hooks/useRefugio";
import TopBar from "../../components/TopBar";
import Sidebar from "../../components/Sidebar";
import { MapaContainer } from "./components/MapaContainer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Mapa = () => {
  const { refugios } = useRefugio();
  useEffect(() => {
    document.title = "Mapa";
  }, []);
  return (
    <main className="min-h-screen bg-[#CCC4BB] flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full bg-[#CCC4BB]">
        <div className="">
          <TopBar />
        </div>

        <div className="flex flex-col items-center lg:flex-row gap-6 justify-center min-h-screen lg:h-5/6">
          <div className="md:w-8/12 flex flex-col lg:h-screen gap-6 ">
            <div className="grid gap-1 pr-8 pl-4">
              <h2 className="font-extrabold text-3xl pt-8 pl-7 mb-2 ">
                Refugios
              </h2>
              <p className="px-7 text-sm">
                Encuentra un refugio cerca de tu zona, puedes solicitar hacer
                transito, adoptar un animal o colaborar con un donativo{" "}
              </p>
            </div>
            <div className="hidden lg:flex md:flex-col mx-3 overflow-auto gap-5">
              {refugios.map((refugio) => (
                <div
                  key={refugio._id}
                  className=" w-[26rem]  gap-3 pb-4 h-max bg-white rounded-lg flex mb-3"
                >
                  <img
                    className="rounded-bl-lg rounded-tl-lg"
                    src={refugio.avatar}
                    width={144}
                    height={144}
                    alt="1"
                  />
                  <div className="grid justify-items-center">
                    <div className="grid ">
                      <h3 className="text-center text-xl mb-3 font-bold capitalize">
                        {refugio.razon_social}
                      </h3>
                      <p className="">
                        Refugio de animales dirigido por veterinarios.
                      </p>
                      <div className="">
                        <p>
                          Direccion:{" "}
                          {`${refugio.direccion}, ${refugio.provincia}`}
                        </p>
                        <p>Telefono: {refugio.whatsApp}</p>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <Link
                        to={`https://wa.me/+5491131496472?text=Hola%20me%20gustaría%20saber%20más%20sobre%20${refugio.whatsApp}`}
                        target="_blank"
                        className="w-1/2 bg-[#FFB800] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center "
                      >
                        Contactar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[50rem] md:w-full md:h-full">
            <MapaContainer refu={refugios}/>
          </div>
          <div className="lg:hidden mx-3 overflow-auto gap-5">
            {refugios.map((refugio) => (
              <div
                key={refugio._id}
                className=" w-[26rem]  gap-3 pb-4 h-max bg-white rounded-lg flex mb-3"
              >
                <img
                  className="rounded-bl-lg rounded-tl-lg"
                  src={refugio.avatar}
                  width={144}
                  height={144}
                  alt="1"
                />
                <div className="grid justify-items-center">
                  <div className="grid ">
                    <h3 className="text-center text-xl mb-3 font-bold capitalize">
                      {refugio.razon_social}
                    </h3>
                    <p className="">
                      Refugio de animales dirigido por veterinarios.
                    </p>
                    <div className="">
                      <p>
                        Direccion:{" "}
                        {`${refugio.direccion}, ${refugio.provincia}`}
                      </p>
                      <p>Telefono: {refugio.whatsApp}</p>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <Link
                      to={`https://wa.me/+5491131496472?text=Hola%20me%20gustaría%20saber%20más%20sobre%20${refugio.whatsApp}`}
                      target="_blank"
                      className="w-1/2 bg-[#FFB800] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center "
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mapa;
