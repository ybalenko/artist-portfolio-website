import type { Route } from "@playwright/test";
import { test, expect } from "../fixtures/contact-api";
import { ContactsPage } from "../pages/ContactsPage";

test("configured form sends a trimmed payload and shows pending then success", async ({
  page,
  contactApi,
}) => {
  const contacts = new ContactsPage(page);
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  let capturedPayload: unknown;
  let requestCount = 0;
  await contactApi.route(async (route) => {
    requestCount += 1;
    capturedPayload = route.request().postDataJSON();
    await responseGate;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    });
  });

  await contacts.open();
  await expect(contacts.submit).toBeEnabled();
  await contacts.name.fill("  Sample Visitor  ");
  await contacts.email.fill("  visitor@example.test  ");
  await contacts.message.fill("  I would like to ask about your work.  ");
  await contacts.submit.click();

  await expect(contacts.submit).toBeDisabled();
  await expect(contacts.submit).toHaveText("Sending…");
  await expect(contacts.status).toHaveText("Sending your message…");
  expect(capturedPayload).toEqual({
    name: "Sample Visitor",
    email: "visitor@example.test",
    message: "I would like to ask about your work.",
    company: "",
  });
  releaseResponse();
  await expect(contacts.status).toHaveText(
    "Thank you — your message has been sent.",
  );
  await expect(contacts.status).toHaveAttribute("data-status-type", "success");
  await expect(contacts.submit).toBeEnabled();
  await expect(contacts.name).toBeEmpty();
  expect(requestCount).toBe(1);
});

test("browser validation blocks an invalid email without contacting the API", async ({
  page,
  contactApi,
}) => {
  const contacts = new ContactsPage(page);
  let requestCount = 0;
  await contactApi.route(async (route) => {
    requestCount += 1;
    await route.fulfill({ status: 200, body: '{"ok":true}' });
  });
  await contacts.open();
  await contacts.name.fill("Sample Visitor");
  await contacts.email.fill("invalid-email");
  await contacts.message.fill("A message");
  await contacts.submit.click();
  await expect(contacts.email).toBeFocused();
  expect(
    await contacts.email.evaluate(
      (input: HTMLInputElement) => input.validity.typeMismatch,
    ),
  ).toBe(true);
  expect(requestCount).toBe(0);
});

for (const status of [400, 413] as const) {
  test(`API ${status} rejection keeps input and gives correction feedback`, async ({
    page,
    contactApi,
  }) => {
    const contacts = new ContactsPage(page);
    await contactApi.route(async (route) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: '{"ok":false}',
      }),
    );
    await contacts.open();
    await contacts.fillValidMessage();
    await contacts.submit.click();
    await expect(contacts.status).toHaveText(
      "Please check the form fields and try again.",
    );
    await expect(contacts.status).toHaveAttribute("data-status-type", "error");
    await expect(contacts.message).toHaveValue(
      "I would like to ask about your work.",
    );
    await expect(contacts.submit).toBeEnabled();
  });
}

test("API rate limit is not reported as a sent message", async ({
  page,
  contactApi,
}) => {
  const contacts = new ContactsPage(page);
  await contactApi.route(async (route) =>
    route.fulfill({
      status: 429,
      contentType: "application/json",
      body: '{"ok":false}',
    }),
  );
  await contacts.open();
  await contacts.fillValidMessage();
  await contacts.submit.click();
  await expect(contacts.status).toHaveText(
    "Sorry — your message could not be sent right now. Please try again later.",
  );
  await expect(contacts.status).toHaveAttribute("data-status-type", "error");
  await expect(contacts.message).toHaveValue(
    "I would like to ask about your work.",
  );
  await expect(contacts.submit).toBeEnabled();
});

for (const failure of ["server", "network"] as const) {
  test(`${failure} failure allows a successful retry without losing the message`, async ({
    page,
    contactApi,
  }) => {
    const contacts = new ContactsPage(page);
    let requestCount = 0;
    await contactApi.route(async (route: Route) => {
      requestCount += 1;
      if (requestCount === 1) {
        if (failure === "server") {
          await route.fulfill({
            status: 502,
            contentType: "application/json",
            body: '{"ok":false}',
          });
        } else {
          await route.abort("failed");
        }
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"ok":true}',
        });
      }
    });
    await contacts.open();
    await contacts.fillValidMessage();
    await contacts.submit.click();
    await expect(contacts.status).toHaveText(
      "Sorry — your message could not be sent right now. Please try again later.",
    );
    await expect(contacts.status).toHaveAttribute("data-status-type", "error");
    await expect(contacts.message).toHaveValue(
      "I would like to ask about your work.",
    );
    await expect(contacts.submit).toBeEnabled();
    await contacts.submit.click();
    await expect(contacts.status).toHaveText(
      "Thank you — your message has been sent.",
    );
    await expect(contacts.message).toBeEmpty();
    expect(requestCount).toBe(2);
  });
}
