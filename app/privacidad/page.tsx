import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export const metadata = {
  title: "Privacidad · Umbral Arquitectura, demostración",
};
export default function Privacy() {
  return (
    <main className="page-wrap max-w-3xl py-16">
      <Link href="/" className="arrow-link">
        <ArrowLeft size={16} />
        Volver a Umbral
      </Link>
      <p className="eyebrow text-accent mt-16 mb-6">Sitio de demostración</p>
      <h1 className="editorial text-6xl mb-10">Privacidad y datos</h1>
      <div className="space-y-8 text-sm leading-7 text-muted">
        <p>
          Umbral Arquitectura es un estudio ficticio. El formulario permite
          probar una consulta con almacenamiento real; no solicita servicios
          profesionales ni garantiza una respuesta.
        </p>
        <section>
          <h2 className="text-foreground text-xl mb-3">Qué se guarda</h2>
          <p>
            Guardamos el nombre, el correo electrónico y el mensaje que envías,
            un identificador y la fecha de creación. También se guardan una
            clave de solicitud para impedir duplicados, una huella del contenido
            y una huella criptográfica de la dirección de conexión para limitar
            la frecuencia. No guardamos la dirección de conexión en texto
            legible.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl mb-3">Finalidad y acceso</h2>
          <p>
            Los datos se utilizan para demostrar el funcionamiento del
            formulario y prevenir abusos o reintentos duplicados. Se almacenan
            en una base de datos a la que accede únicamente el servidor. No hay
            un listado público de consultas. Este formulario no envía correos
            electrónicos.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl mb-3">
            Conservación configurada
          </h2>
          <p>
            Se ha configurado la eliminación de consultas con más de 30 días al
            inicializar la aplicación y antes de procesar una nueva consulta. La
            eliminación no ocurre mediante un temporizador: si el sitio
            permanece inactivo, los registros pueden conservarse hasta el
            siguiente procesamiento. No se ha configurado un plazo independiente
            para las copias de seguridad del proveedor.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl mb-3">Antes de enviar</h2>
          <p>
            No introduzcas información sensible, direcciones, documentos ni
            detalles confidenciales de proyectos reales. No se identifica a un
            responsable profesional ni se ofrece un canal de contacto ficticio.
            Si no deseas guardar tus datos, puedes explorar los proyectos sin
            utilizar el formulario.
          </p>
        </section>
      </div>
    </main>
  );
}
