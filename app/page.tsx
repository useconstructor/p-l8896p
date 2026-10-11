import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight, Plus } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { ProjectCatalog } from "./components/ProjectCatalog";
import { InquiryForm } from "./components/InquiryForm";
import { ScrollVideoHero } from "./components/ScrollVideoHero";
import { getProjects, type Project } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; proyecto?: string }>;
}) {
  const params = await searchParams;
  let projects: Project[] = [];
  let error = false;
  try {
    projects = await getProjects();
  } catch {
    error = true;
  }
  return (
    <>
      <Navigation />
      <main id="contenido">
        <section className="page-wrap pt-10 md:pt-14 pb-8">
          <div className="grid md:grid-cols-[.93fr_1fr] gap-7 lg:gap-14">
            <div className="flex flex-col justify-between py-3 md:pb-7">
              <div>
                <p className="eyebrow flex items-center gap-3 text-muted">
                  <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                  Arquitectura residencial · Estudio conceptual
                </p>
                <h1 className="editorial text-[64px] sm:text-[80px] md:text-[60px] lg:text-[104px] leading-[.92] mt-10 lg:mt-14">
                  Espacios para
                  <br />
                  <em className="text-accent">habitar.</em>
                  <br />
                  Tiempo para
                  <br />
                  vivir.
                </h1>
              </div>
              <div className="mt-9 md:mt-12">
                <p className="text-[12px] leading-[1.9] text-muted max-w-[300px]">
                  Pensamos la arquitectura desde lo cotidiano.
                  <br className="hidden lg:block" /> La luz que entra, la
                  materia que se toca,
                  <br className="hidden lg:block" /> el lugar al que siempre
                  quieres volver.
                </p>
                <a href="#proyectos" className="arrow-link mt-6 min-w-[210px]">
                  Explorar proyectos
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <figure className="relative">
              <div className="relative aspect-[.93] md:aspect-[.83] max-h-[670px] overflow-hidden bg-surface">
                <Image
                  src="/media/hero.jpg"
                  alt="Referencia visual de una casa abierta al jardín, con madera, vegetación y luz natural"
                  fill
                  priority
                  sizes="(max-width: 767px) 90vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-5 border border-white/50 pointer-events-none" />
                <span className="absolute top-8 left-8 bg-black/45 px-2 py-1 text-white text-[9px] tracking-[.15em] uppercase">
                  El interior empieza afuera.
                </span>
                <span className="absolute bottom-8 right-8 text-white text-[9px] tracking-[.2em]">
                  UMBRAL / 01
                </span>
              </div>
              <figcaption className="flex justify-between gap-4 text-[9px] text-muted pt-4">
                <span>Casa del patio · Exploración conceptual</span>
                <span>Imagen de referencia</span>
              </figcaption>
            </figure>
          </div>
          <div className="mt-9 md:mt-12 flex justify-between items-center border-b border-line pb-6">
            <span className="eyebrow text-muted text-[8px]">
              Un umbral entre lo que imaginas y lo que habitas.
            </span>
            <a
              href="#proyectos"
              aria-label="Descubrir proyectos"
              className="flex items-center justify-center h-11 w-11 border border-line rounded-full hover:text-accent"
            >
              <ArrowDown size={17} />
            </a>
          </div>
        </section>
        <ProjectCatalog
          initialProjects={projects}
          initialCategory={params.categoria || "Todos"}
          initialSlug={params.proyecto || ""}
          initialError={error}
        />
        <section id="estudio" className="bg-surface py-20 md:py-24">
          <div className="page-wrap grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative aspect-[1.05] bg-line">
              <Image
                src="/media/detail.jpg"
                alt="Referencia visual de un interior donde la luz destaca los materiales naturales"
                fill
                sizes="(max-width: 767px) 90vw, 45vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-background/95 px-3 py-2 eyebrow text-[8px]">
                Materia, luz y silencio.
              </span>
            </div>
            <div>
              <p className="eyebrow text-accent mb-6">02 / El estudio</p>
              <h2 className="editorial text-[50px] lg:text-[65px] leading-[.98]">
                La arquitectura
                <br />
                empieza en
                <br />
                <em>cómo vivimos.</em>
              </h2>
              <p className="mt-7 text-[12px] leading-7 text-muted">
                Umbral es un estudio ficticio de arquitectura residencial. Un
                espacio de exploración para imaginar hogares atentos a las
                personas, al entorno y a las pequeñas cosas de cada día.
              </p>
              <p className="mt-4 text-[12px] leading-7 text-muted">
                Nos interesa lo esencial: una distribución que fluye, materiales
                honestos y una relación sensible con la luz. Esta web presenta
                conceptos, no obras construidas ni servicios profesionales
                acreditados.
              </p>
              <div className="border-t border-line mt-7 pt-5 flex flex-wrap gap-x-8 gap-y-3">
                <span className="eyebrow text-[8px]">Mirada conceptual</span>
                <span className="eyebrow text-[8px]">Diseño espacial</span>
                <span className="eyebrow text-[8px]">Materialidad</span>
              </div>
              <p className="text-[9px] mt-3 text-muted">
                Áreas de trabajo del estudio ficticio, sin atribución a personas
                reales.
              </p>
            </div>
          </div>
        </section>
        <section id="servicios" className="page-wrap py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-accent mb-5">03 / Qué imaginamos</p>
              <h2 className="editorial text-[50px] md:text-[64px] leading-none">
                De la idea <em>al espacio.</em>
              </h2>
            </div>
            <p className="max-w-[260px] text-xs text-muted leading-6 md:pt-9">
              Tres maneras de explorar un hogar.
              <br />
              Un mismo cuidado por cada detalle.
              <br />
              Todos los alcances son conceptuales.
            </p>
          </div>
          <div className="grid md:grid-cols-[1.4fr_1fr] border border-line">
            <a
              href="#consulta"
              className="group p-8 md:p-10 bg-surface md:row-span-2 flex flex-col justify-between min-h-[350px] md:min-h-[430px]"
            >
              <div className="flex justify-between">
                <span className="eyebrow text-muted">
                  01 / Proyecto residencial
                </span>
                <ArrowUpRight size={20} />
              </div>
              <div className="my-6 flex justify-center">
                <svg
                  width="190"
                  height="120"
                  viewBox="0 0 190 120"
                  fill="none"
                  aria-hidden="true"
                  className="text-accent"
                >
                  <path
                    d="M20 110V25h105v85H20Zm105 0h45V55h-45M45 110V50h55v60M45 80h55M75 50v60M10 25h125M20 15v105M170 45v75M10 110h170"
                    stroke="currentColor"
                    strokeWidth=".8"
                  />
                  <path
                    d="M10 5h125M10 1v8m125-8v8M180 55v55m-4-55h8m-8 55h8"
                    stroke="currentColor"
                    strokeWidth=".5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="editorial text-4xl group-hover:underline decoration-1 underline-offset-8">
                  Imaginar desde el origen.
                </h3>
                <p className="text-xs text-muted leading-6 mt-3 max-w-[330px]">
                  Conceptos de vivienda unifamiliar: relaciones espaciales, luz
                  natural y vínculos con el exterior.
                </p>
              </div>
            </a>
            {[
              {
                number: "02",
                label: "Reforma integral",
                title: "Volver a mirar lo que existe.",
                text: "Explorar nuevas distribuciones y posibilidades para transformar la manera de vivir un espacio.",
              },
              {
                number: "03",
                label: "Interiorismo",
                title: "Lo que hace tuyo un lugar.",
                text: "Propuestas de materiales, atmósferas y mobiliario que dan sentido a la escala doméstica.",
              },
            ].map((s) => (
              <a
                key={s.number}
                href="#consulta"
                className="group p-8 border-t md:border-t-0 md:border-l border-line last:border-t flex flex-col justify-between min-h-[215px]"
              >
                <div className="flex justify-between">
                  <span className="eyebrow text-muted">
                    {s.number} / {s.label}
                  </span>
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="editorial text-[30px] group-hover:underline decoration-1 underline-offset-8">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted leading-6 mt-3 max-w-[340px]">
                    {s.text}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
        <section id="proceso" className="page-wrap pb-20 md:pb-24">
          <div className="border-t border-line pt-12">
            <p className="eyebrow text-accent mb-5">04 / El proceso</p>
            <h2 className="editorial text-[48px] md:text-[64px] leading-none">
              Escuchar. Imaginar. <em>Dar forma.</em>
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
              {[
                {
                  title: "Conversación inicial",
                  text: "Entender cómo habitas, qué necesitas y qué te gustaría cambiar.",
                },
                {
                  title: "Concepto",
                  text: "Traducir las ideas en una primera visión espacial, abierta al diálogo.",
                },
                {
                  title: "Desarrollo",
                  text: "Explorar la distribución, la luz y los materiales con mayor detalle.",
                },
                {
                  title: "Acompañamiento",
                  text: "Revisar las decisiones y dar coherencia al conjunto de la propuesta.",
                },
              ].map((s, i) => (
                <li key={s.title} className="border-t border-line pt-5">
                  <span className="editorial text-4xl text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="text-xs font-medium mt-6 mb-3">{s.title}</h3>
                  <p className="text-[11px] leading-6 text-muted max-w-[230px]">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-[9px] text-muted mt-8">
              Proceso ilustrativo de esta demostración. No constituye una oferta
              de ejecución de obra.
            </p>
          </div>
        </section>
        <section className="bg-foreground text-background py-14 md:py-20">
          <div className="page-wrap grid md:grid-cols-[.8fr_1.2fr] gap-8 items-center">
            <div>
              <p className="eyebrow text-[#d7b4a5] mb-5">
                El cuaderno de Umbral
              </p>
              <h2 className="editorial text-[48px] leading-none">
                Ideas que toman
                <br />
                <em>otra dimensión.</em>
              </h2>
              <p className="text-xs leading-6 text-[#d7cec2] mt-6 max-w-[280px]">
                Una pausa para observar. Una exploración visual de nuestro
                universo conceptual que acompaña tu recorrido.
              </p>
            </div>
            <ScrollVideoHero />
          </div>
        </section>
        <section
          id="consulta"
          className="page-wrap py-20 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-24"
        >
          <div>
            <p className="eyebrow text-accent mb-6">
              05 / Empezamos por una conversación
            </p>
            <h2 className="editorial text-[58px] lg:text-[76px] leading-[.97]">
              Todo espacio
              <br />
              empieza con
              <br />
              <em className="text-accent">una idea.</em>
            </h2>
            <p className="text-xs text-muted leading-7 mt-7 max-w-[300px]">
              ¿Qué te gustaría imaginar? Comparte tu idea y prueba el formulario
              de esta demostración.
            </p>
            <div className="flex items-start gap-3 mt-9 max-w-[330px] border-t border-line pt-5">
              <MoveUpRight size={17} className="shrink-0 text-accent" />
              <p className="text-[10px] text-muted leading-5">
                Umbral Arquitectura es un estudio ficticio. No introduzcas datos
                sensibles ni información de un proyecto real.
              </p>
            </div>
          </div>
          <div className="md:pt-12">
            <InquiryForm />
          </div>
        </section>
      </main>
      <footer className="bg-foreground text-background">
        <div className="page-wrap py-12">
          <div className="flex flex-col sm:flex-row justify-between gap-8 items-start">
            <Link href="/" className="editorial text-5xl">
              umbral
              <span className="block font-sans text-[8px] uppercase tracking-[.26em] mt-2">
                Arquitectura
              </span>
            </Link>
            <p className="editorial text-3xl max-w-[270px]">
              Entre el espacio
              <br />y la vida.
            </p>
            <a
              href="#contenido"
              className="flex items-center gap-8 min-h-11 text-[11px]"
            >
              Volver arriba
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-4 text-[9px] text-[#d7cec2]">
            <p>
              © {new Date().getFullYear()} Umbral Arquitectura · Estudio
              ficticio. Sitio de demostración.
            </p>
            <Link
              href="/privacidad"
              className="underline underline-offset-4 min-h-11 inline-flex items-center"
            >
              Privacidad y datos
            </Link>
            <span>Diseñar una forma de habitar.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
