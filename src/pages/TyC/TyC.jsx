import { useEffect } from "react";

const TyC = () => {
   useEffect(() => {
     document.title = 'Terminos y condiciones'
   }, [])
  return (
    <div className="bg-[#E3DBD3] gap-24 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-bold">Términos y condiciones</h1>
      <p className="w-2/4 font-bold">
        Términos y Condiciones de Uso Bienvenido a Pet Transity . Al utilizar
        nuestro sitio web el <span className="font-semibold">Sitio</span>,
        aceptas cumplir con los siguientes términos y condiciones de uso. Si no
        estás de acuerdo con estos términos, te recomendamos que no utilices
        nuestro Sitio. Uso del Sitio Al utilizar nuestro Sitio, aceptas cumplir
        con todas las leyes y regulaciones aplicables. No debes utilizar nuestro
        Sitio de manera fraudulenta o para actividades ilegales o no
        autorizadas. No debes dañar, sobrecargar ni interferir de manera
        perjudicial en la operación de nuestro Sitio. Contenido y Propiedad
        Intelectual El contenido de nuestro Sitio, incluyendo textos, imágenes,
        gráficos, logotipos y software, está protegido por leyes de propiedad
        intelectual y es propiedad de la Compañía o de terceros que nos han
        otorgado licencias. No tienes el derecho de reproducir, distribuir o
        modificar el contenido de nuestro Sitio sin autorización previa por
        escrito. Enlaces a Terceros Nuestro Sitio puede contener enlaces a
        sitios web de terceros. No tenemos control sobre el contenido o las
        prácticas de privacidad de estos sitios y no somos responsables de
        ellos. Privacidad Tu uso de nuestro Sitio está sujeto a nuestra Política
        de Privacidad. Al utilizar nuestro Sitio, aceptas nuestras prácticas de
        privacidad. Limitación de Responsabilidad No garantizamos que nuestro
        Sitio esté libre de errores o que funcione sin interrupciones. No
        seremos responsables de los daños que puedas sufrir al utilizar nuestro
        Sitio. Cambios en los Términos Nos reservamos el derecho de modificar
        estos términos y condiciones en cualquier momento. Los cambios serán
        efectivos al publicar los términos y condiciones revisados en nuestro
        Sitio. Te recomendamos revisar periódicamente estos términos. Contacto
        Si tienes alguna pregunta o inquietud sobre estos términos y
        condiciones, por favor contáctanos a través de pettransity@gmail.com.
      </p>
    </div>
  );
};

export default TyC;
