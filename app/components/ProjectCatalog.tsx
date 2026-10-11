"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  LoaderCircle,
  X,
} from "lucide-react";
import type { Project } from "@/lib/projects";
const editorialImages: Record<string, string> = {
  "casa-del-patio": "/media/editorial-patio.jpg",
  "habitar-la-luz": "/media/editorial-exterior.jpg",
  "materia-en-calma": "/media/editorial-interior.jpg",
};
const categories = [
  "Todos",
  "Vivienda unifamiliar",
  "Reforma integral",
  "Interiores",
];
export function ProjectCatalog({
  initialProjects,
  initialCategory,
  initialSlug,
  initialError,
}: {
  initialProjects: Project[];
  initialCategory: string;
  initialSlug: string;
  initialError: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [projects, setProjects] = useState(
    initialProjects.filter(
      (p) => initialCategory === "Todos" || p.category === initialCategory,
    ),
  );
  const [allProjects, setAllProjects] = useState(initialProjects);
  const [slug, setSlug] = useState(initialSlug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [slide, setSlide] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const controller = useRef<AbortController | null>(null);
  const categoryRef = useRef(initialCategory);
  const openedHere = useRef(false);
  const origin = useRef<HTMLElement | null>(null);
  const inquiryDestination = useRef(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const selected = allProjects.find((p) => p.slug === slug);
  async function load(filter: string) {
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `/api/projects?categoria=${encodeURIComponent(filter)}`,
        { signal: abort.signal, cache: "no-store" },
      );
      if (!response.ok) throw Error();
      const data: Project[] = await response.json();
      if (abort.signal.aborted) return;
      setProjects(data);
      if (filter === "Todos") setAllProjects(data);
      setAnnouncement(
        `${data.length} ${data.length === 1 ? "proyecto conceptual" : "proyectos conceptuales"} en ${filter}.`,
      );
    } catch {
      if (!abort.signal.aborted) setError(true);
    } finally {
      if (!abort.signal.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    const onBack = () => {
      const params = new URLSearchParams(location.search);
      const next = params.get("categoria") || "Todos";
      setCategory(next);
      setSlug(params.get("proyecto") || "");
      setSlide(0);
      if (next !== categoryRef.current) {
        categoryRef.current = next;
        void load(next);
      }
      openedHere.current = false;
    };
    window.addEventListener("popstate", onBack);
    return () => {
      window.removeEventListener("popstate", onBack);
      controller.current?.abort();
    };
  }, []);
  function filter(next: string) {
    categoryRef.current = next;
    setCategory(next);
    const url = new URL(location.href);
    if (next === "Todos") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", next);
    history.pushState(null, "", url);
    void load(next);
  }
  function open(p: Project, element: HTMLElement) {
    origin.current = element;
    openedHere.current = true;
    setSlide(0);
    setSlug(p.slug);
    const url = new URL(location.href);
    url.searchParams.set("proyecto", p.slug);
    history.pushState(null, "", url);
  }
  function close() {
    setSlug("");
    setSlide(0);
    if (openedHere.current) {
      history.back();
      openedHere.current = false;
    } else {
      const url = new URL(location.href);
      url.searchParams.delete("proyecto");
      history.replaceState(null, "", url);
    }
  }
  return (
    <>
      <section id="proyectos" className="catalog-section">
        <div className="page-wrap">
          <div className="flex justify-between gap-8 items-start">
            <div>
              <p className="eyebrow section-label mb-4">
                Proyectos conceptuales
              </p>
              <h2 className="editorial text-[38px] md:text-[44px] leading-[1.05]">
                Casas pensadas
                <br />
                para una vida real.
              </h2>
            </div>
            <p className="hidden md:block text-[11px] text-muted leading-6 max-w-[230px] pt-8">
              Una selección de propuestas ficticias.
              <br />
              Ideas que exploran la relación entre
              <br />
              el espacio, la materia y la vida.
            </p>
          </div>
          <div
            className="mt-6 mb-7 border-b border-line flex flex-wrap gap-x-7 gap-y-1"
            aria-label="Filtrar proyectos"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => filter(c)}
                aria-pressed={category === c}
                className={`min-h-12 text-[11px] border-b -mb-px ${category === c ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"}`}
              >
                {c}
                {category === c && (
                  <span className="sr-only">, filtro activo</span>
                )}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
            {loading ? "Cargando proyectos." : ""}
          </p>
          {loading ? (
            <div className="min-h-72 flex items-center justify-center gap-3 text-muted text-sm">
              <LoaderCircle className="animate-spin" size={19} />
              Cargando proyectos…
            </div>
          ) : error ? (
            <div role="alert" className="py-14 border border-line text-center">
              <p className="text-sm">
                No se pueden cargar los proyectos en este momento.
              </p>
              <button
                className="arrow-link mt-3"
                onClick={() => load(category)}
              >
                Volver a intentar
                <ArrowRight size={16} />
              </button>
            </div>
          ) : !projects.length ? (
            <div className="py-16 text-center">
              <p className="editorial text-3xl">
                Aún no hay propuestas en esta categoría.
              </p>
              <button
                onClick={() => filter("Todos")}
                className="arrow-link mt-4"
              >
                Ver todos los proyectos
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {projects.map((p) => (
                <button
                  key={p.slug}
                  onClick={(e) => open(p, e.currentTarget)}
                  className="group project-card text-left w-full border border-line bg-background"
                  aria-label={`Ver proyecto ${p.title}`}
                >
                  <div className="relative overflow-hidden bg-surface aspect-square">
                    <Image
                      src={editorialImages[p.slug] || p.images[0]}
                      alt={p.alts[0]}
                      fill
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                    />
                    <div className="absolute inset-3 border border-white/0 group-hover:border-white/50 group-focus-visible:border-white/50" />
                    <span className="absolute bottom-3 left-3 bg-background/95 px-2 py-1 text-[8px] tracking-[.1em] uppercase">
                      Propuesta ficticia
                    </span>
                    <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/95">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="project-copy">
                    <h3 className="editorial text-[25px] group-hover:text-accent group-focus-visible:text-accent">
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-muted mt-1">{p.category}</p>
                    <span className="flex items-center gap-3 text-[11px] text-accent mt-4">
                      Ver proyecto <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="mt-12 flex justify-between border-t border-line pt-4">
            <p className="text-[9px] text-muted">
              Imágenes de referencia. Ninguna propuesta representa una obra
              construida.
            </p>
            <ArrowDown className="hidden sm:block text-accent" size={15} />
          </div>
        </div>
      </section>
      <Dialog.Root
        open={!!slug}
        onOpenChange={(value) => {
          if (!value) close();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
          <Dialog.Content
            aria-describedby="project-description"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              closeButton.current?.focus();
            }}
            onCloseAutoFocus={(e) => {
              if (inquiryDestination.current) {
                e.preventDefault();
                inquiryDestination.current = false;
                document
                  .getElementById("consulta")
                  ?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                  });
                document.getElementById("name")?.focus({ preventScroll: true });
                return;
              }
              if (origin.current) {
                e.preventDefault();
                origin.current.focus();
              }
            }}
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%_-_32px)] max-w-5xl max-h-[90dvh] overflow-y-auto bg-background shadow-2xl"
          >
            <div className="sticky top-0 z-10 bg-background flex items-center justify-between border-b border-line px-5 py-3">
              <p className="eyebrow text-accent">
                Propuesta conceptual ficticia
              </p>
              <Dialog.Close
                ref={closeButton}
                className="flex items-center justify-center w-11 h-11"
                aria-label="Cerrar proyecto"
              >
                <X size={22} />
              </Dialog.Close>
            </div>
            {selected ? (
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="relative aspect-[4/5] bg-surface">
                    <Image
                      src={
                        slide === 0
                          ? editorialImages[selected.slug] ||
                            selected.images[slide]
                          : selected.images[slide]
                      }
                      alt={selected.alts[slide]}
                      fill
                      sizes="(max-width: 767px) 90vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between px-6 py-3 border-b border-line text-xs">
                    <button
                      onClick={() =>
                        setSlide(
                          (slide - 1 + selected.images.length) %
                            selected.images.length,
                        )
                      }
                      aria-label="Imagen anterior"
                      className="h-11 w-11 flex items-center justify-center"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <span aria-live="polite">
                      {slide + 1} / {selected.images.length}
                    </span>
                    <button
                      onClick={() =>
                        setSlide((slide + 1) % selected.images.length)
                      }
                      aria-label="Imagen siguiente"
                      className="h-11 w-11 flex items-center justify-center"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <p className="eyebrow text-muted mb-5">{selected.category}</p>
                  <Dialog.Title className="editorial text-5xl mb-8">
                    {selected.title}
                  </Dialog.Title>
                  <h4 className="eyebrow mb-4">Concepto espacial</h4>
                  <Dialog.Description
                    id="project-description"
                    className="text-sm text-muted leading-7"
                  >
                    {selected.description}
                  </Dialog.Description>
                  <h4 className="eyebrow mt-9 mb-4">Materialidad propuesta</h4>
                  <ul className="text-sm text-muted space-y-3">
                    {selected.materials.map((m) => (
                      <li key={m} className="border-b border-line pb-3">
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-muted leading-5 mt-7">
                    Las fotografías son referencias visuales y no documentan la
                    ejecución de esta propuesta.
                  </p>
                  <a
                    href="#consulta"
                    onClick={(event) => {
                      event.preventDefault();
                      inquiryDestination.current = true;
                      openedHere.current = false;
                      close();
                      history.replaceState(
                        null,
                        "",
                        new URL("#consulta", location.href),
                      );
                    }}
                    className="arrow-link text-accent mt-7 w-full"
                  >
                    Consultar una idea similar
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-10">
                <Dialog.Title className="editorial text-4xl mb-4">
                  Proyecto no disponible
                </Dialog.Title>
                <Dialog.Description
                  id="project-description"
                  className="text-sm text-muted"
                >
                  No encontramos una propuesta con este enlace. Puedes cerrar la
                  ficha y explorar el catálogo.
                </Dialog.Description>
                <Dialog.Close className="arrow-link mt-6">
                  Explorar el catálogo
                  <ArrowRight size={17} />
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
