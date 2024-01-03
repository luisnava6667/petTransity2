/* eslint-disable react/prop-types */
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const NavBarLogin = ({ textButtonNav, imgButton, styles, ruta }) => {
  return (
    <header className="w-full">
      <div className="grid justify-center justify-items-center lg:flex lg:justify-around bg-[#CCC4BB]">
        <Link className="block text-teal-600" to="/">
          <img className="" alt="logo" src={logo} />
        </Link>
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4 px-auto">
            <Link className={styles} to={`${ruta}`}>
              <img
                className=""
                width={50}
                height={50}
                alt="logo"
                src={imgButton}
              />
              {textButtonNav}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBarLogin;
