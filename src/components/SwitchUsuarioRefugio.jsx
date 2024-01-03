const SwitchUsuarioRefugio = ({ selectedButton, handleButtonClick }) => {
  return (
    <div className="w-[25rem] mt-5 flex justify-center items-center">
      <button
        type="submit"
        className={`flex w-96 h-14 lg:text-2xl items-center border-2 border-[#4F3300] justify-center rounded-l-xl ${
          selectedButton === "refugio"
            ? "bg-[#E59D1C] text-[#303030]"
            : "bg-[#ccc4bb] text-[#303030]"
        } px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick("refugio")}
      >
        Refugio
      </button>
      <button
        type="submit"
        className={`flex w-96 h-14 text-center items-center border-2 border-[#4F3300] justify-center rounded-r-xl ${
          selectedButton === "usuarios"
            ? "bg-[#E59D1C] text-[#303030]"
            : "bg-[#ccc4bb] text-[#303030]"
        } px-3 py-1.5 text-sm lg:text-2xl font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={() => handleButtonClick("usuarios")}
      >
        Usuario
      </button>
    </div>
  );
};

export default SwitchUsuarioRefugio;
