/* import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import Form from "./components/Form";
import useAuth from "../../hooks/useAuth";

export const UserId = () => {
  const { auth } = useAuth();
  const {
    nombre,
    apellido,
    email,
    img,
    localidad,
    direccion,
    piso,
    unidad,
    hogar,
    codigoPostal,
    patio_jardin,
    ambientes,
    estado_domicilio,
  } = auth;
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full bg-[#CCC4BB]">
        <TopBar />
        <div className="grid justify-items-center">
          <Form
            nombre={nombre}
            apellido={apellido}
            email={email}
            img={img}
            localidad={localidad}
            direccion={direccion}
            piso={piso}
            unidad={unidad}
            hogar={hogar}
            codigoPostal={codigoPostal}
            patio_jardin={patio_jardin}
            ambientes={ambientes}
            estado_domicilio={estado_domicilio}
          />
        </div>
      </div>
    </div>
  );
};
 */

const UserId = () => {
  return <div>UserId</div>
}

export default UserId
