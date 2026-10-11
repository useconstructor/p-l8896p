import { getProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    return Response.json(
      await getProjects(
        new URL(req.url).searchParams.get("categoria") || undefined,
      ),
    );
  } catch {
    return Response.json(
      { error: "No se pueden cargar los proyectos." },
      { status: 503 },
    );
  }
}
