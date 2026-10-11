import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  MoveUpRight,
  DraftingCompass,
  Armchair,
  Layers,
} from "lucide-react";
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
        <section className="hero-grid">
          <div className="hero-copy">
            <div className="architectural-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="eyebrow section-label">Arquitectura residencial</p>
            <h1 className="editorial hero-title">
              Espacios que
              <br />
              marcan el
              <br />
              <em className="text-accent">umbral</em> de
              <br />
              lo cotidiano.
            </h1>
            <p className="hero-description">
              Imaginamos casas que dialogan con su entorno,
              <br className="hidden lg:block" /> para habitar con calma, luz y
              propósito.
            </p>
            <a href="#proyectos" className="solid-link">
              Ver proyectos <ArrowUpRight size={15} />
            </a>
            <div className="hero-caption">
              <div>
                <span className="eyebrow">Propuesta destacada</span>
                <p className="editorial">Casa del patio</p>
              </div>
              <span>Concepto ficticio</span>
            </div>
          </div>
          <figure className="hero-photo">
            <Image
              src="/media/editorial-hero.jpg"
              alt="Referencia arquitectónica de un patio con un árbol, muros de hormigón y luz cálida"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
              className="object-cover"
            />
            <figcaption className="photo-label">
              Imagen de referencia · Estudio ficticio
            </figcaption>
            <a
              href="#proyectos"
              className="hero-down"
              aria-label="Descubrir proyectos"
            >
              <ArrowDown size={18} />
            </a>
          </figure>
        </section>
        <ProjectCatalog
          initialProjects={projects}
          initialCategory={params.categoria || "Todos"}
          initialSlug={params.proyecto || ""}
          initialError={error}
        />
        <section id="estudio" className="studio-grid">
          <figure className="studio-photo">
            <Image
              src="/media/editorial-studio.jpg"
              alt="Referencia de un interior sereno con madera, un árbol y luz natural"
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover"
            />
          </figure>
          <div className="studio-copy">
            <p className="eyebrow section-label">El estudio</p>
            <h2 className="editorial">
              Arquitectura con
              <br />
              <em>esencia y contexto.</em>
            </h2>
            <p>
              Umbral Arquitectura es un estudio ficticio de arquitectura
              residencial. Un espacio para imaginar hogares que conectan a las
              personas con lo esencial: la luz, la naturaleza y el tiempo.
            </p>
            <p>
              Entendemos cada propuesta como una conversación entre la forma de
              vivir y el espacio. Las imágenes son referencias visuales; los
              proyectos son conceptos, no obras construidas.
            </p>
            <a href="#proceso" className="outline-link">
              Conoce nuestro enfoque <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
        <section id="servicios" className="page-wrap services-section">
          <p className="eyebrow section-label">Servicios conceptuales</p>
          <div className="services-bento">
            <div className="services-intro">
              <h2 className="editorial">
                De la idea al espacio.
                <br />
                Cada detalle importa.
              </h2>
              <p>Tres maneras de explorar un hogar, con un mismo cuidado.</p>
            </div>
            <a href="#consulta" className="service-tile service-main">
              <DraftingCompass size={28} strokeWidth={1} />
              <h3 className="editorial">Diseño arquitectónico</h3>
              <p>
                Imaginar desde el origen: relaciones espaciales, luz natural y
                vínculos con el exterior.
              </p>
              <span>
                Más información <ArrowUpRight size={14} />
              </span>
            </a>
            <figure className="service-image service-image-four">
              <Image
                src="/media/editorial-garden.jpg"
                alt="Referencia de un jardín residencial junto a una fachada de piedra"
                fill
                sizes="10vw"
                className="object-cover"
              />
            </figure>
            <figure className="service-image service-image-one">
              <Image
                src="/media/editorial-service.jpg"
                alt="Referencia de un patio residencial con vegetación y luz natural"
                fill
                sizes="(max-width: 767px) 90vw, 32vw"
                className="object-cover"
              />
            </figure>
            <a href="#consulta" className="service-tile service-interiors">
              <Armchair size={28} strokeWidth={1} />
              <h3 className="editorial">Interiores</h3>
              <p>
                Materiales, atmósferas y mobiliario que dan sentido a la escala
                doméstica.
              </p>
              <span>
                Más información <ArrowUpRight size={14} />
              </span>
            </a>
            <figure className="service-image service-image-two">
              <Image
                src="/media/editorial-patio.jpg"
                alt="Referencia de un comedor abierto al exterior"
                fill
                sizes="(max-width: 767px) 45vw, 22vw"
                className="object-cover"
              />
            </figure>
            <a href="#consulta" className="service-tile service-reform">
              <Layers size={28} strokeWidth={1} />
              <h3 className="editorial">Reforma integral</h3>
              <p>
                Volver a mirar lo que existe. Explorar nuevas distribuciones y
                maneras de vivir un espacio.
              </p>
              <span>
                Más información <ArrowUpRight size={14} />
              </span>
            </a>
            <figure className="service-image service-image-three">
              <Image
                src="/media/editorial-interior.jpg"
                alt="Referencia de un salón con vigas de madera abierto al jardín"
                fill
                sizes="(max-width: 767px) 45vw, 32vw"
                className="object-cover"
              />
            </figure>
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
