"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
const links = [
  ["Proyectos", "#proyectos"],
  ["Estudio", "#estudio"],
  ["Servicios", "#servicios"],
  ["Proceso", "#proceso"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a") || [],
          ),
          toggle.current!,
        ];
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <>
      <a
        href="#contenido"
        className="fixed top-2 left-4 z-[100] bg-foreground px-5 py-3 text-background -translate-y-24 focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-md">
        <div className="page-wrap flex h-[78px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Umbral Arquitectura, inicio"
            className="flex items-center gap-3"
          >
            <span className="flex flex-col">
              <span className="editorial text-[39px] leading-[.9]">Umbral</span>
              <span className="mt-1.5 text-xs tracking-[.29em] uppercase">
                Arquitectura
              </span>
            </span>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-4 lg:gap-8 text-sm"
          >
            {links.map(([label, url]) => (
              <a
                key={url}
                href={url}
                className="min-h-11 flex items-center hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#consulta"
            className="hidden md:flex min-h-11 items-center gap-6 bg-accent text-background px-5 text-sm hover:bg-foreground transition-colors"
          >
            Hablemos
            <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden flex h-11 w-11 items-center justify-center"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div
          ref={panel}
          id="mobile-nav"
          inert={!open}
          className={`md:hidden absolute w-full bg-background border-b border-line px-6 py-8 transition-[transform,opacity] duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
        >
          <nav aria-label="Navegación móvil" className="flex flex-col">
            {[...links, ["Consultar una idea", "#consulta"]].map(
              ([label, url], i) => (
                <a
                  key={url}
                  href={url}
                  onClick={() => {
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                  style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                  className={`editorial text-3xl py-3 transition-[transform,opacity] duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
                >
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
