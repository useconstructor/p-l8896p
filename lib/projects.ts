import "server-only";
import { db } from "./db";
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  alts: string[];
  materials: string[];
  editorialOrder: number;
};
const seeds: Project[] = [
  {
    slug: "casa-del-patio",
    title: "Casa del patio",
    category: "Vivienda unifamiliar",
    description:
      "Una casa que se organiza alrededor de un vacío. El patio lleva la luz al centro de la vida cotidiana y establece un diálogo entre el interior y el jardín. Una exploración conceptual de la intimidad, la sombra y el aire.",
    images: ["/media/patio.jpg", "/media/interior.jpg"],
    alts: [
      "Referencia visual de una casa contemporánea abierta a un patio",
      "Referencia visual de un interior doméstico luminoso",
    ],
    materials: ["Estuco mineral", "Piedra natural", "Madera de roble"],
    editorialOrder: 1,
  },
  {
    slug: "habitar-la-luz",
    title: "Habitar la luz",
    category: "Reforma integral",
    description:
      "Reimaginar una vivienda desde lo esencial: abrir recorridos, conectar estancias y dejar que la luz encuentre su camino. Esta propuesta ficticia estudia cómo una nueva distribución puede transformar la experiencia de habitar.",
    images: ["/media/interior.jpg", "/media/detail.jpg"],
    alts: [
      "Referencia visual de un espacio abierto con mobiliario y luz natural",
      "Referencia visual de materiales cálidos en un espacio doméstico",
    ],
    materials: ["Cal natural", "Roble claro", "Lino"],
    editorialOrder: 2,
  },
  {
    slug: "materia-en-calma",
    title: "Materia en calma",
    category: "Interiores",
    description:
      "Una paleta contenida y materiales que invitan al tacto. La propuesta conceptual busca un espacio doméstico sereno mediante texturas naturales, muebles de líneas sencillas y una luz que cambia a lo largo del día.",
    images: ["/media/detail.jpg", "/media/interior.jpg"],
    alts: [
      "Referencia visual de un interior cálido de tonos naturales",
      "Referencia visual de un salón contemporáneo",
    ],
    materials: ["Madera natural", "Cerámica", "Tejidos de lino"],
    editorialOrder: 3,
  },
  {
    slug: "jardin-adentro",
    title: "Jardín adentro",
    category: "Vivienda unifamiliar",
    description:
      "Una propuesta ficticia que explora el jardín como una estancia más de la casa. Muros de piedra, sombra y aperturas enmarcan una vida cotidiana en contacto con el exterior. Las imágenes son referencias del concepto, no una obra construida.",
    images: ["/media/editorial-garden.jpg", "/media/editorial-hero.jpg"],
    alts: [
      "Referencia de una casa de piedra con patio y vegetación",
      "Referencia de un patio con un árbol y muros de hormigón",
    ],
    materials: ["Piedra natural", "Madera", "Estuco mineral"],
    editorialOrder: 4,
  },
];
let initialized: Promise<void> | undefined;
export function initialize() {
  return (initialized ??= (async () => {
    const tx = await db.transaction("write");
    try {
      await tx.execute(
        "CREATE TABLE IF NOT EXISTS initialization (key TEXT PRIMARY KEY)",
      );
      await tx.execute(
        "CREATE TABLE IF NOT EXISTS projects (slug TEXT PRIMARY KEY, title TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL, images TEXT NOT NULL, alts TEXT NOT NULL, materials TEXT NOT NULL, editorial_order INTEGER NOT NULL)",
      );
      await tx.execute(
        "CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL, request_key TEXT UNIQUE NOT NULL, fingerprint TEXT NOT NULL, client_hash TEXT NOT NULL)",
      );
      await tx.execute(
        "CREATE INDEX IF NOT EXISTS inquiry_rate ON inquiries(client_hash, created_at)",
      );
      const marker = await tx.execute(
        "SELECT key FROM initialization WHERE key='concept-projects-v1'",
      );
      if (!marker.rows.length) {
        for (const p of seeds)
          await tx.execute({
            sql: "INSERT OR IGNORE INTO projects VALUES (?,?,?,?,?,?,?,?)",
            args: [
              p.slug,
              p.title,
              p.category,
              p.description,
              JSON.stringify(p.images),
              JSON.stringify(p.alts),
              JSON.stringify(p.materials),
              p.editorialOrder,
            ],
          });
        await tx.execute(
          "INSERT INTO initialization VALUES ('concept-projects-v1')",
        );
      }
      const galleryMarker = await tx.execute(
        "SELECT key FROM initialization WHERE key='concept-gallery-v2'",
      );
      if (!galleryMarker.rows.length) {
        const p = seeds.find((project) => project.slug === "jardin-adentro")!;
        await tx.execute({
          sql: "INSERT OR IGNORE INTO projects VALUES (?,?,?,?,?,?,?,?)",
          args: [
            p.slug,
            p.title,
            p.category,
            p.description,
            JSON.stringify(p.images),
            JSON.stringify(p.alts),
            JSON.stringify(p.materials),
            p.editorialOrder,
          ],
        });
        await tx.execute(
          "INSERT INTO initialization VALUES ('concept-gallery-v2')",
        );
      }
      await tx.commit();
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      tx.close();
    }
  })().catch((e) => {
    initialized = undefined;
    throw e;
  }));
}
export async function getProjects(category?: string) {
  await initialize();
  const result = await db.execute(
    category && category !== "Todos"
      ? {
          sql: "SELECT * FROM projects WHERE category=? ORDER BY editorial_order",
          args: [category],
        }
      : "SELECT * FROM projects ORDER BY editorial_order",
  );
  return result.rows.map((r) => ({
    slug: String(r.slug),
    title: String(r.title),
    category: String(r.category),
    description: String(r.description),
    images: JSON.parse(String(r.images)),
    alts: JSON.parse(String(r.alts)),
    materials: JSON.parse(String(r.materials)),
    editorialOrder: Number(r.editorial_order),
  })) as Project[];
}
