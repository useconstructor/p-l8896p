import { test, expect } from "@playwright/test";
import { createClient } from "@libsql/client";
import { randomUUID } from "node:crypto";
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:umbral.local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
test("catalogue, URL, keyboard modal, errors and empty state", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Espacios para",
  );
  await page.getByRole("button", { name: "Interiores", exact: false }).click();
  await expect(page).toHaveURL(/categoria=Interiores/);
  await expect(page.getByRole("button", { name: "Ver proyecto" })).toHaveCount(
    1,
  );
  const card = page.getByRole("button", {
    name: "Ver proyecto Materia en calma",
  });
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Cerrar proyecto" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Imagen siguiente" }).click();
  await expect(page.getByRole("dialog")).toContainText("2 / 2");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
  await card.click();
  await page.reload();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/?proyecto=no-existe");
  await expect(
    page.getByRole("heading", { name: "Proyecto no disponible" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.route("**/api/projects*", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.getByRole("button", { name: "Todos", exact: false }).click();
  await expect(
    page.getByRole("button", { name: "Volver a intentar" }),
  ).toBeVisible();
  await page.unroute("**/api/projects*");
  await page.getByRole("button", { name: "Volver a intentar" }).click();
  await expect(page.getByRole("button", { name: "Ver proyecto" })).toHaveCount(
    3,
  );
  await page.route("**/api/projects*", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "[]" }),
  );
  await page.getByRole("button", { name: "Interiores", exact: false }).click();
  await expect(
    page.getByText("Aún no hay propuestas en esta categoría."),
  ).toBeVisible();
});
test("validation, failed submission retains values, successful exact persistence", async ({
  page,
}) => {
  await page.goto("/#consulta");
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(page.getByText("Escribe al menos 2 caracteres.")).toBeVisible();
  const email = `qa.${randomUUID()}@example.test`;
  const message =
    "Consulta de prueba automatizada: luz, patio y materiales naturales.";
  await page.getByLabel("Tu nombre").fill("Prueba QA");
  await page.getByLabel("Correo electrónico").fill("incorrecto");
  await page.getByLabel("Cuéntanos tu idea").fill("breve");
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(page.getByText("Introduce un correo válido.")).toBeVisible();
  await page.getByLabel("Correo electrónico").fill(email);
  await page
    .getByLabel("Cuéntanos tu idea")
    .pressSequentially(message, { delay: 1 });
  await page.getByLabel("Cuéntanos tu idea").fill(message);
  await page.route("**/*", async (route) => {
    if (route.request().headers()["next-action"]) await route.abort("failed");
    else await route.continue();
  });
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(page.locator("form [role=alert]")).toContainText(
    "No se ha podido",
  );
  await expect(page.getByLabel("Cuéntanos tu idea")).toHaveValue(message);
  await page.unroute("**/*");
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(page.getByText("Tu idea ya tiene un lugar.")).toBeVisible();
  await page.reload();
  const saved = await db.execute({
    sql: "SELECT name,email,message FROM inquiries WHERE email=?",
    args: [email],
  });
  expect(saved.rows).toHaveLength(1);
  expect(saved.rows[0]).toMatchObject({ name: "Prueba QA", email, message });
  await db.execute({
    sql: "DELETE FROM inquiries WHERE email=?",
    args: [email],
  });
});
for (const width of [1440, 768, 390])
  test(`responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      await expect(
        page
          .getByRole("navigation", { name: "Navegación móvil" })
          .getByRole("link", { name: "Proyectos" }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Abrir menú" }),
      ).toBeFocused();
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#consulta");
    await expect(
      page.getByRole("button", { name: "Enviar consulta", exact: true }),
    ).toBeVisible();
  });
test("server validation, idempotent retries, honeypot and rate limit", async ({
  page,
  request,
}) => {
  await page.goto("/#consulta");
  const token = randomUUID();
  const email = `qa.${token}@example.test`;
  await page.getByLabel("Tu nombre").fill("Prueba servidor");
  await page.getByLabel("Correo electrónico").fill(email);
  await page
    .getByLabel("Cuéntanos tu idea")
    .fill("Consulta de prueba del servidor y su protección contra duplicados.");
  const pending = page.waitForRequest((r) => !!r.headers()["next-action"]);
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  const captured = await pending;
  await expect(page.getByText("Tu idea ya tiene un lugar.")).toBeVisible();
  const original = JSON.parse(captured.postData()!);
  const send = async (data: unknown[]) =>
    request.post("/", {
      headers: {
        "next-action": captured.headers()["next-action"],
        "content-type": "text/plain;charset=UTF-8",
        origin: "http://localhost:3000",
      },
      data: JSON.stringify(data),
    });
  await send(original);
  expect(
    (
      await db.execute({
        sql: "SELECT id FROM inquiries WHERE email=?",
        args: [email],
      })
    ).rows,
  ).toHaveLength(1);
  const invalid = [
    {
      ...original[0],
      name: "X",
      email: "invalid",
      message: "short",
      requestKey: randomUUID(),
    },
  ];
  const invalidResponse = await send(invalid);
  expect(await invalidResponse.text()).toContain('"ok":false');
  const spam = [{ ...original[0], website: "spam", requestKey: randomUUID() }];
  expect(await (await send(spam)).text()).toContain('"ok":false');
  try {
    for (let i = 0; i < 4; i++) {
      const data = [
        {
          ...original[0],
          email: `qa.${token}.${i}@example.test`,
          requestKey: randomUUID(),
        },
      ];
      expect(await (await send(data)).text()).toContain('"ok":true');
    }
    const limited = [
      {
        ...original[0],
        email: `qa.${token}.limited@example.test`,
        requestKey: randomUUID(),
      },
    ];
    expect(await (await send(limited)).text()).toContain(
      "Has alcanzado el límite",
    );
  } finally {
    await db.execute({
      sql: "DELETE FROM inquiries WHERE email LIKE ?",
      args: [`qa.${token}%`],
    });
  }
});
