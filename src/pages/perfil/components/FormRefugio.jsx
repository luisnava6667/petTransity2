/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import name from "../../../assets/name.svg";
import mail from "../../../assets/mail.svg";
import editarFoto from "../../../assets/editarFoto.svg";
import editar from "../../../assets/editar.svg";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import InputForm from "../../../components/InputForm";
import { CloudinaryContext, Image } from "cloudinary-react";
import Spinner from "../../../components/Spinner";
import clienteAxios from "../../../config/clienteAxios";
import spinner from "../../../assets/spinner.svg";
import Swal from "sweetalert2";

const FormRefugio = () => {
  const { auth } = useAuth();
  // console.log(auth);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [estadoInput, setEstadoInput] = useState(true);
  const [estadoBoton, setEstadoBoton] = useState("hidden");
  const [textVisibility, setTextVisibility] = useState("flex");
  const [spinnerVisibility, setSpinnerVisibility] = useState("hidden");

  const token = localStorage.getItem("token");

  const editarFormulario = () => {
    estadoInput === true ? setEstadoInput(false) : setEstadoInput(true);
    estadoBoton === "hidden"
      ? setEstadoBoton("flex")
      : setEstadoBoton("hidden");
    estadoInput === false && formik.setValues(auth);
  };

  const handleReset = () => {
    formik.setValues(auth);
    setEstadoInput(true);
    setEstadoBoton("hidden");
  };

  // agregar ambienter
  const required = "Este campo es requerido";

  const formik = useFormik({
    initialValues: {
      nombre: auth.nombre,
      apellido: auth.apellido,
      razon_social: auth.razon_social,
      avatar: auth.avatar,
      cuit: auth.cuit,
      email: auth.email,
      direccion: auth.direccion,
      piso: auth.piso,
      unidad: auth.unidad,
      provincia: auth.provincia,
      localidad: auth.localidad,
      comuna: auth.comuna,
      barrio: auth.barrio,
      codigoPostal: auth.codigoPostal,
      estado_refugio: auth.estado_refugio,
      web: auth.web,
      whatsApp: auth.whatsApp,
      facebook: auth.facebook,
      youtube: auth.youtube,
      instagram: auth.instagram,
    },
    validationSchema: Yup.object({
      comuna: Yup.string().required(required),
      localidad: Yup.string().required(required),
      whatsApp: Yup.string().required(required),
      estado_refugio: Yup.string().required(required),
      direccion: Yup.string()
        .matches(/\d/, "Debe contener al menos un número")
        .required(required),
    }),

    onSubmit: async (values) => {
      // console.log(values);
      try {
        setTextVisibility("hidden");
        setSpinnerVisibility("flex");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await clienteAxios.put(
          `${auth.role}/update-info`,
          values,
          config
        );
        Swal.fire({
          icon: "success",
          title: `${res.msg}`,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        setTimeout(() => {
          Swal.close();
           window.location.reload()
        }, 4000);
        console.log(res.data);
      } catch (error) {
        setTextVisibility("flex");
        setSpinnerVisibility("hidden");
        setError(error.response.data.msg);
        Swal.fire({
          icon: "error",
          title: `${error.response.data.msg}`,
          showConfirmButton: true,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    },
  });
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  useEffect(() => {
    formik.setValues(auth);
    setCargando(false);
  }, [auth]);

  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <div className="grid  rounded-xl mx-10 md:mx-20 lg:mx-28 xl:mx-36 2xl:mx-56 px-10 bg-[#E6E2DD] mb-2 overflow-y-auto">
      <div className="grid">
        <div className="flex justify-between w-full">
          <h3 className="text-2xl font-bold text-black mt-10">Perfil</h3>
          <div className="w-2/2 flex flex-col items-center mt-4">
            <img
              className="rounded-[45px] w-40 h-40"
              src={auth.avatar }
              alt=""
            />
          </div>
          <button
            onClick={editarFormulario}
            to=""
            className="mt-10 w-24 h-8 flex gap-2 items-center justify-center rounded-lg  text-black bg-white font-bold text-base  text-center shadow-md"
          >
            Editar
            <img className="w-4 h-4" src={editar} alt="" />
          </button>
        </div>
        <form
          className="bg-[#E6E2DD] overflow-auto w-full flex flex-col items-center lg:mx-5 pt-5 space-y-6 pb-10 rounded-3xl  "
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
        >
          <CloudinaryContext cloudName="TU_CLOUD_NAME"></CloudinaryContext>
          <InputForm
            label="Nombre"
            name="nombre"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.nombre}
            placeholder="Nombre"
            touched={touched}
            errors={errors}
            nameSrc={name}
          />
          <InputForm
            label="Apellido"
            name="apellido"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.apellido}
            placeholder="Apellido"
            touched={touched}
            errors={errors}
            nameSrc={name}
          />
          <InputForm
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.email}
            placeholder="Email"
            touched={touched}
            errors={errors}
            nameSrc={mail}
          />
          <InputForm
            label="Direccion"
            name="direccion"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.direccion}
            placeholder="Direccion"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Piso"
            name="piso"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.piso}
            placeholder="Piso"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Unidad"
            name="unidad"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.unidad}
            placeholder="Unidad"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Código Postal"
            name="codigoPostal"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.codigoPostal}
            placeholder="Código Postal"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Localidad"
            name="localidad"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value="CABA"
            placeholder="CABA"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <div>
            <div className="flex gap-1  my-3">
              <img alt="icono de etiqueta provincia" src={name} />
              <label
                htmlFor="provincia"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Provincia <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="mt-2">
              <select
                id="provincia"
                name="provincia"
                onChange={handleChange}
                onBlur={handleBlur}
                value="Buenos Aires"
                className={`block w-[31.5rem] h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.provincia && errors.provincia
                    ? "ring-red-500  focus:ring-red-500"
                    : "ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600"
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Otra Provincia">Otra Provincia</option>
              </select>
              {touched.provincia && errors.provincia && (
                <div className="flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end">
                  {errors.provincia}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-1  my-3">
              <img alt="icono de etiqueta comuna" src={name} />
              <label
                htmlFor="comuna"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Comuna <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="mt-2">
              <select
                id="comuna"
                name="comuna"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                disabled={estadoInput}
                value={formik.values.comuna}
                placeholder="Comuna"
                className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.comuna && errors.comuna
                    ? "ring-red-500  focus:ring-red-500"
                    : "ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600"
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                <option value="" disabled>
                  Selecciona una comuna
                </option>
                <option value="Comuna 1">Comuna 1</option>
                <option value="Comuna 2">Comuna 2</option>
                <option value="Comuna 3">Comuna 3</option>
                <option value="Comuna 4">Comuna 4</option>
                <option value="Comuna 5">Comuna 5</option>
                <option value="Comuna 6">Comuna 6</option>
                <option value="Comuna 7">Comuna 7</option>
                <option value="Comuna 8">Comuna 8</option>
                <option value="Comuna 9">Comuna 9</option>
                <option value="Comuna 10">Comuna 10</option>
                <option value="Comuna 11">Comuna 11</option>
                <option value="Comuna 12">Comuna 12</option>
                <option value="Comuna 13">Comuna 13</option>
                <option value="Comuna 14">Comuna 14</option>
                <option value="Comuna 15">Comuna 15</option>
              </select>
              {touched.comuna && errors.comuna && (
                <div className="flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end">
                  {errors.comuna}
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-1  my-3">
              <img alt="icono de etiqueta barrio" src={name} />
              <label
                htmlFor="barrio"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Barrio <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="mt-2">
              <select
                id="barrio"
                name="barrio"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={estadoInput}
                value={formik.values.barrio}
                className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.barrio && errors.barrio
                    ? "ring-red-500  focus:ring-red-500"
                    : "ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600"
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                <option value="" disabled>
                  Selecciona un barrio
                </option>
                <option value="Agronomía">Agronomía</option>
                <option value="Almagro">Almagro</option>
                <option value="Balvanera">Balvanera</option>
                <option value="Barracas">Barracas</option>
                <option value="Belgrano">Belgrano</option>
                <option value="Boedo">Boedo</option>
                <option value="Caballito">Caballito</option>
                <option value="Chacarita">Chacarita</option>
                <option value="Coghlan">Coghlan</option>
                <option value="Colegiales">Colegiales</option>
                <option value="Constitución">Constitución</option>
                <option value="Flores">Flores</option>
                <option value="Floresta">Floresta</option>
                <option value="La Boca">La Boca</option>
                <option value="La Paternal">La Paternal</option>
                <option value="Liniers">Liniers</option>
                <option value="Mataderos">Mataderos</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Monte Castro">Monte Castro</option>
                <option value="Nueva Pompeya">Nueva Pompeya</option>
                <option value="Núñez">Núñez</option>
                <option value="Palermo">Palermo</option>
                <option value="Parque Avellaneda">Parque Avellaneda</option>
                <option value="Parque Chacabuco">Parque Chacabuco</option>
                <option value="Parque Chas">Parque Chas</option>
                <option value="Parque Patricios">Parque Patricios</option>
                <option value="Puerto Madero">Puerto Madero</option>
                <option value="Recoleta">Recoleta</option>
                <option value="Retiro">Retiro</option>
                <option value="Saavedra">Saavedra</option>
                <option value="San Cristóbal">San Cristóbal</option>
                <option value="San Nicolás">San Nicolás</option>
                <option value="San Telmo">San Telmo</option>
                <option value="Vélez Sarsfield">Vélez Sarsfield</option>
                <option value="Versalles">Versalles</option>
                <option value="Villa Crespo">Villa Crespo</option>
                <option value="Villa del Parque">Villa del Parque</option>
                <option value="Villa Devoto">Villa Devoto</option>
                <option value="Villa Gral. Mitre">Villa Gral. Mitre</option>
                <option value="Villa Lugano">Villa Lugano</option>
                <option value="Villa Luro">Villa Luro</option>
                <option value="Villa Ortúzar">Villa Ortúzar</option>
                <option value="Villa Pueyrredón">Villa Pueyrredón</option>
                <option value="Villa Real">Villa Real</option>
                <option value="Villa Riachuelo">Villa Riachuelo</option>
                <option value="Villa Santa Rita">Villa Santa Rita</option>
                <option value="Villa Soldati">Villa Soldati</option>
                <option value="Villa Urquiza">Villa Urquiza</option>
              </select>
              {touched.barrio && errors.barrio && (
                <div className="flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end">
                  {errors.barrio}
                </div>
              )}
            </div>
          </div>

          <InputForm
            label="Web"
            name="web"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.web}
            placeholder="Web"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Facebook"
            name="facebook"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.facebook}
            placeholder="Facebook"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="YouTube"
            name="youtube"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.youtube}
            placeholder="YouTube"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <InputForm
            label="Instagram"
            name="instagram"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.instagram}
            placeholder="Instagram"
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={estadoInput}
          />
          <div className={` ${estadoBoton} justify-end items-center pt-10`}>
            <button
              onClick={handleReset}
              type="submit"
              className="flex mt-4 w-56 h-14 text-center items-center  border-2  justify-center rounded-2xl  px-3 py-1.5 text-sm lg:text-2xl font-semibold leading-6 text-[#4F3300]  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex mt-4 w-56 h-14 text-center items-center  border-2 border-[#4F3300] justify-center rounded-2xl bg-[#E59D1C] px-3 py-1.5 text-sm lg:text-2xl font-semibold leading-6 text-[#4F3300]  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <img className={`${spinnerVisibility}`} src={spinner} />

              <p className={`${textVisibility}`}>Actualizar</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRefugio;
