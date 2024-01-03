import { Link } from "react-router-dom";
import x from "../assets/x.webp";

const Footer = () => {
  return (
    <div className="bg-[#6F4C48] w-full p-4 md:p-8">
      <div className="flex justify-between">
        <div className="md:col-span-4 xl:col-span-2">
          <h2 className="font-bold text-base mb-6 uppercase">Menu</h2>
          <nav className="flex flex-col gap-4">
            <a
              href="/"
              className="hover:underline hover:text-[#E59D1C] font-medium"
            >
              Inicio
            </a>
            <a
              href="/"
              className="hover:underline hover:text-[#E59D1C] font-medium"
            >
              Nosotros
            </a>
            <a
              href="/"
              className="hover:underline hover:text-[#E59D1C] font-medium"
            >
              Contacto
            </a>
          </nav>
        </div>
        <div className="md:col-span-4 xl:col-span-3">
          <h2 className="font-bold mb-6 uppercase text-base">Redes sociales</h2>
          <nav>
            <Link
              href="https://www.facebook.com"
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors active:text-[#E59D1C] font-medium"
              target="_blank"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                className="w-[20px] h-[20px]"
                alt="JT Devs"
              />
              Pet Transity
            </Link>
            <Link
              href="https://www.instagram.com/"
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors active:text-[#E59D1C] font-medium"
              target="_blank"
            >
              <img src={x} className="w-[20px] h-[20px]" alt="JT Devs" />
              Pet Transity
            </Link>
            <Link
              href="https://twitter.com/home?lang=es"
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors active:text-[#E59D1C] font-medium"
              target="_blank"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                className="w-[20px] h-[20px]"
                alt="JT Devs"
              />
              Pet Transity
            </Link>
          </nav>
        </div>
        <div className="md:col-span-4 xl:col-span-3">
          <h2 className="font-bold mb-6 uppercase">Contacto</h2>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Buenos Aires, Argentina
            </p>
            <p className="flex items-center gap-2 hover:text-[#E59D1C] font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              pettransity@gmail.com
            </p>
            <p className="flex items-center gap-2 hover:text-[#E59D1C] font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              (+54 9) 11 55 11 22 88
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col xl:flex-row  gap-4 items-center justify-between">
        <p className="text-gray-800 text-center md:text-left">
          &copy; 2023{" "}
          {/* <span className="text-gray-900 font-bold">ItEra Devs.</span>  */}
          Todos los derechos reservados.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Link
            to="/terms-and-conditions"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Terminos y condiciones
          </Link>
          <span className="hidden md:flex">|</span>
          <Link
            to="/privacy-policy"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Política de privacidad
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
