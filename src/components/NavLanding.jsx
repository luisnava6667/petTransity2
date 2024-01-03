import { useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../assets/logoWhite.svg";
import donar from "../assets/donar.svg";
const NavLanding = () => {
  const [display, setDisplay] = useState("hidden");

  const handleDisplay = () => {
    display === "hidden" ? setDisplay("block") : setDisplay("hidden");
  };
  return (
    <div className="grid absolute top-0 z-20 w-full md:py-4 md:px-11 md:gap-16 bg-[#6f4c48] bg-opacity-95   justify-items-center md:flex md:justify-between shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] drop-shadow-xl ">
      <Link className="block  md:w-1/2" to="/">
        <img
          className="md:w-72 md:h-[5.6rem] lg:w-[26.7rem] lg:h-[5.6rem]"
          alt="logo"
          src={logoWhite}
        />
      </Link>
      <div className=" items-center gap-4 flex justify-end my-5 md:my-0 text-center md:w-1/2">
        <Link
          to="/login"
          className="flex  justify-center text-center items-center underline underline-offset-4 mx-3  text-xl font-bold text-white transition md:w-fit h-14  "
        >
          Ingresar
        </Link>
        {/* <Link
          to="/donar"
          className="flex  justify-evenly text-center items-center rounded-md bg-[#E59D1C] px-5 py-2.5 text-xl font-bold text-white transition md:w-44 h-14  shadow-md"
        >
          <img className="" width={20} height={20} alt="logo" src={donar} />
          Donar
        </Link> */}
        <div className="relative inline-block  ">
          <button
            onClick={handleDisplay}
            className="relative z-10 flex flex-1 justify-center items-center pl-2 text-white text-xl font-bold  w-36 h-14  bg-[#E59D1C] border border-transparent rounded-md shadow-md dark:text-white dark:bg-gray-800 focus:outline-none  "
          >
            <span className="mx-1">Registrarse</span>
            <svg
              className="w-5 h-5 mx-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          <div
            className={`${display} absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-gray-200 rounded-md shadow-xl dark:bg-gray-800`}
          >
            {/* <a
                href="#"
                className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <img
                  className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                  src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                  alt="jane avatar"
                />
                <div className="mx-1">
                  <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Jane Doe
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    janedoe@exampl.com
                  </p>
                </div>
              </a> */}
            <Link
              to={"/register-usuario"}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Usuario
            </Link>

            <hr className="border-gray-200 dark:border-gray-700 " />

            <Link
              to={"/register-refugio"}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Refugio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLanding;
