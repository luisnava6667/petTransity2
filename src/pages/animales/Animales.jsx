import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import Spinner from "../../components/Spinner";
import clienteAxios from "../../config/clienteAxios";
import { Link } from "react-router-dom";

const Animales = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // console.log(role)
  const [cargando, setCargando] = useState(true);
  const [pet, setPet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Animales";

    const getPet = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        if (role === "refugio") {
          const { data } = await clienteAxios.get("/animales/myPets", config);
          setPet(data);
          setCargando(false);
        } else {
          const { data } = await clienteAxios.get("/animales", config);
          setPet(data);
          setCargando(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPet();
  }, [role, token]);
  const filteredPets = pet.filter((animal) =>
    animal.nombre.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <main className="h-screen bg-[#CCC4BB] flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <div className="">
          <TopBar />
        </div>
        {cargando ? (
          <Spinner />
        ) : (
          <div className=" w-full overflow-auto">
            <div className="mb-10">
              <div className="flex justify-between">
                <h2 className="font-extrabold text-2xl pt-8 pl-7 mb-2 ">
                  Animales refugiados
                </h2>
                {role === "refugio" && (
                  <Link
                    className="flex rounded-md bg-green-700 m-2  justify-around items-center font-medium text-gray-100 transition  w-36 h-11 shadow-md"
                    to="/register-animales"
                  >
                    Añadir un animal
                  </Link>
                )}
              </div>
              <div className="pl-7">
                <input
                  type="text"
                  placeholder="Buscar animal por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-lg  w-56"
                />
              </div>
              <p className="px-14 text-xl">
                {role === "refugio"
                  ? "Aqui veras tus animales si posees"
                  : "Encuentra un refugio cerca de tu zona, puedes solicitar hacer transito, adoptar un animal o colaborar con un donativo"}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 mx-10 sm:mx-5 mb-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 pr-8 pl-4">
              {filteredPets?.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white rounded-lg flex items-center justify-evenly w-56"
                >
                  <div>
                    <img src={pet.avatar} width={100} height={100} />
                  </div>
                  <div className="grid justify-items-center my-3">
                    <div className="grid">
                      <h3 className="text-center text-xl mb-3 font-bold capitalize">
                        {pet.nombre}
                      </h3>
                    </div>
                    <div className="flex gap-5">
                      <Link
                        to={`/animales/${pet._id}`}
                        className="border-black border-2 px-4 rounded-lg font-bold"
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Animales;
