const contactApiUrl = import.meta.env.PUBLIC_CONTACT_API_URL?.trim() ?? "";

export const contactMessageFormConfig = {
  apiUrl: contactApiUrl,
  isEnabled: Boolean(contactApiUrl),
  maxNameLength: 100,
  maxMessageLength: 5000,
  successMessage: "Thank you — your message has been sent.",
  setupMessage:
    "Message delivery setup is in progress. The form will be enabled after the contact API is configured.",
  failureMessage:
    "Sorry — your message could not be sent right now. Please try again later.",
} as const;
