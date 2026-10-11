"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveInquiry } from "@/app/actions";
import { inquirySchema, type FieldErrors } from "@/lib/validation";
import Link from "next/link";
export function InquiryForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const key = useRef("");
  const lock = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lock.current) return;
    setError("");
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setError("Revisa los campos indicados antes de enviar.");
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setErrors({});
    lock.current = true;
    setBusy(true);
    key.current ||= crypto.randomUUID();
    try {
      const result = await saveInquiry({ ...values, requestKey: key.current });
      if (result.ok) setSuccess(true);
      else {
        setErrors(result.fields || {});
        setError(result.error || "Revisa los campos indicados.");
      }
    } catch {
      setError(
        "No se ha podido guardar la consulta. Puedes volver a intentarlo.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  if (success)
    return (
      <div role="status" className="border-t border-line py-12">
        <Check size={32} className="text-accent mb-6" />
        <h3 className="editorial text-4xl mb-4">Tu idea ya tiene un lugar.</h3>
        <p className="text-base leading-7 text-muted">
          La consulta se ha guardado en esta demostración. No se ha enviado un
          correo ni se garantiza una respuesta.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setValues({ name: "", email: "", message: "", website: "" });
            key.current = "";
          }}
          className="arrow-link mt-5"
        >
          Escribir otra consulta
          <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form ref={form} onSubmit={handleSubmit} noValidate className="space-y-6">
      {error && (
        <p
          role="alert"
          className="text-base text-accent border border-accent p-3"
        >
          {error}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        {(["name", "email"] as const).map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm mb-3">
              {field === "name" ? "Tu nombre" : "Correo electrónico"}{" "}
              <span className="text-accent">*</span>
            </label>
            <Input
              id={field}
              name={field}
              autoComplete={field === "name" ? "name" : "email"}
              type={field === "email" ? "email" : "text"}
              value={values[field]}
              onChange={(e) =>
                setValues({ ...values, [field]: e.target.value })
              }
              maxLength={field === "name" ? 100 : 254}
              required
              disabled={busy}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
              className="rounded-none border-0 border-b border-line bg-transparent shadow-none h-12 px-0 text-base focus-visible:ring-0"
            />
            {errors[field] && (
              <p id={`${field}-error`} className="text-sm text-accent mt-2">
                {errors[field]?.[0]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm mb-3">
          Cuéntanos tu idea <span className="text-accent">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          rows={4}
          maxLength={5000}
          required
          disabled={busy}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className="rounded-none border-0 border-b border-line bg-transparent shadow-none px-0 resize-y text-base focus-visible:ring-0 min-h-28"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-accent mt-2">
            {errors.message[0]}
          </p>
        ) : (
          <p id="message-hint" className="text-sm text-muted mt-2">
            Entre 20 y 5000 caracteres.
          </p>
        )}
      </div>
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues({ ...values, website: e.target.value })}
        />
      </div>
      <p className="text-sm text-muted leading-5">
        Formulario de demostración. Guardamos tu nombre, correo y mensaje.
        No se ha configurado una eliminación automática de las consultas. Evita información sensible.{" "}
        <Link href="/privacidad" className="underline underline-offset-4">
          Ver privacidad
        </Link>
        .
      </p>
      <button
        type="submit"
        disabled={busy}
        className="flex justify-between items-center gap-10 bg-accent text-background px-6 py-4 text-sm min-h-12 hover:bg-foreground disabled:opacity-60 transition-opacity w-full sm:w-auto"
      >
        {busy ? "Guardando…" : "Enviar consulta"}
        {busy ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <ArrowUpRight size={17} />
        )}
      </button>
    </form>
  );
}
