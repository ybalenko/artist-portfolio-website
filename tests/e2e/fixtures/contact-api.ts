import { test as base, expect, type Route } from "@playwright/test";

export const contactApiUrl = "https://contact-api.test.invalid/messages";

export const test = base.extend<{
  contactApi: {
    route: (handler: (route: Route) => Promise<void>) => Promise<void>;
  };
}>({
  contactApi: async ({ page, context, baseURL }, use) => {
    const localOrigin = new URL(baseURL!).origin;
    const unexpected: string[] = [];
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = request.url();
      if (url === contactApiUrl) {
        unexpected.push(`${request.method()} ${url}`);
        await route.abort();
        return;
      }
      if (
        new URL(url).origin === localOrigin &&
        (request.method() === "GET" || request.method() === "HEAD")
      ) {
        await route.continue();
        return;
      }
      unexpected.push(`${request.method()} ${url}`);
      await route.abort();
    });

    await use({
      route: async (handler) => {
        await page.route(contactApiUrl, async (route) => {
          const request = route.request();
          const headers = request.headers();
          if (
            request.method() !== "POST" ||
            headers["content-type"] !== "application/json" ||
            headers.origin !== localOrigin
          ) {
            unexpected.push(
              `Unexpected contact request: ${request.method()} ${request.url()} ${headers["content-type"] ?? "no content type"} ${headers.origin ?? "no origin"}`,
            );
            await route.abort();
            return;
          }
          await handler(route);
        });
      },
    });
    expect(unexpected, "No unexpected external or write requests").toEqual([]);
  },
});

export { expect } from "@playwright/test";
