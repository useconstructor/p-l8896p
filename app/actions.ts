"use server";
import { headers } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { initialize } from "@/lib/projects";
import { inquirySchema, type FieldErrors } from "@/lib/validation";
export type InquiryResult = {
  ok: boolean;
  error?: string;
  fields?: FieldErrors;
  id?: string;
};
export async function saveInquiry(input: {
  name: string;
  email: string;
  message: string;
  website: string;
  requestKey: string;
}): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, fields: parsed.error.flatten().fieldErrors };
  if (input.website)
    return {
      ok: false,
      error: "No se ha podido guardar la consulta. Revisa el formulario.",
    };
  if (!/^[\da-f-]{36}$/i.test(input.requestKey))
    return { ok: false, error: "Recarga la página y vuelve a intentarlo." };
  try {
    await initialize();
    const h = await headers();
    const hash = (s: string) => createHash("sha256").update(s).digest("hex");
    const clientHash = hash(
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        h.get("x-real-ip") ||
        "local",
    );
    const data = parsed.data;
    const fingerprint = hash(JSON.stringify(data));
    const tx = await db.transaction("write");
    try {
      await tx.execute(
        "DELETE FROM inquiries WHERE created_at < strftime('%Y-%m-%dT%H:%M:%fZ','now','-30 days')",
      );
      const duplicate = await tx.execute({
        sql: "SELECT id, fingerprint FROM inquiries WHERE request_key=? OR (fingerprint=? AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ','now','-10 minutes')) LIMIT 1",
        args: [input.requestKey, fingerprint],
      });
      if (duplicate.rows.length) {
        await tx.commit();
        return duplicate.rows[0].fingerprint === fingerprint
          ? { ok: true, id: String(duplicate.rows[0].id) }
          : {
              ok: false,
              error: "La solicitud ya se utilizó. Recarga la página.",
            };
      }
      const rate = await tx.execute({
        sql: "SELECT COUNT(*) AS count FROM inquiries WHERE client_hash=? AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ','now','-1 hour')",
        args: [clientHash],
      });
      if (Number(rate.rows[0].count) >= 5) {
        await tx.commit();
        return {
          ok: false,
          error:
            "Has alcanzado el límite de consultas. Vuelve a intentarlo en una hora.",
        };
      }
      const id = randomUUID();
      await tx.execute({
        sql: "INSERT INTO inquiries VALUES (?,?,?,?,?,?,?,?)",
        args: [
          id,
          data.name,
          data.email,
          data.message,
          new Date().toISOString(),
          input.requestKey,
          fingerprint,
          clientHash,
        ],
      });
      await tx.commit();
      return { ok: true, id };
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      tx.close();
    }
  } catch {
    return {
      ok: false,
      error:
        "No hemos podido guardar tu consulta. Tus datos siguen aquí; puedes volver a intentarlo.",
    };
  }
}
