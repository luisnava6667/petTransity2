// import CardInfoAnimalEnTransito from './CardInfoAnimalEnTransito'
import { Link } from "react-router-dom";
import cancelar from "../assets/cancelar.svg";

const InformacionCasaDashboard = () => {
  return (
    <div className="flex w-full  sm:w-[46rem] h-80 mt-7  bg-[#E6E2DD] rounded-2xl items-center justify-center">
      <div className="w-52">
        <h2 className="text-center font-bold">Tránsito</h2>
        <p>Estado: Transitando</p>
        <p>Tipo de vivienda: Casa</p>
        <p>Patio: Sí</p>
        <p className="font-bold">Mascotas:</p>
        <p>
          2 perros tranquilos, se llevan bien con otros animales y son muy
          sociables
        </p>
        <div className="sm:flex sm:gap-4 items-center justify-center px-auto w-44 h-8 bg-red-600 rounded-lg text-white font-bold p-2 mt-7">
          <Link className="flex gap-2" href="#">
            <img
              className=""
              width={18}
              height={18}
              alt="logo"
              src={cancelar}
            />
            Finalizar tránsito
          </Link>
        </div>
      </div>
      {/* <CardInfoAnimalEnTransito /> */}
    </div>
  );
};

export default InformacionCasaDashboard;
