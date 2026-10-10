import type { Page } from "@playwright/test";

export class ContactsPage {
  readonly form;
  readonly name;
  readonly email;
  readonly message;
  readonly submit;
  readonly status;

  constructor(readonly page: Page) {
    this.form = page.locator("[data-contact-form]");
    this.name = this.form.getByRole("textbox", { name: "Name required" });
    this.email = this.form.getByRole("textbox", { name: "Email required" });
    this.message = this.form.getByRole("textbox", { name: "Message required" });
    this.submit = this.form.getByRole("button", {
      name: /Send message|Sending/,
    });
    this.status = this.form.getByRole("status");
  }

  async open() {
    await this.page.goto("/contacts/");
  }

  async fillValidMessage() {
    await this.name.fill("Sample Visitor");
    await this.email.fill("visitor@example.test");
    await this.message.fill("I would like to ask about your work.");
  }
}
