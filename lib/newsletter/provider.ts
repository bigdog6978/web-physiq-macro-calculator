export interface NewsletterSignupInput {
  email: string;
  source: string;
}

export interface NewsletterProvider {
  subscribe(input: NewsletterSignupInput): Promise<{ ok: boolean; message: string }>;
}

class NoopNewsletterProvider implements NewsletterProvider {
  async subscribe(): Promise<{ ok: boolean; message: string }> {
    // Placeholder integration point:
    // Replace with ConvertKit/Mailchimp API calls in the provider implementation.
    return {
      ok: true,
      message: "Thanks! You're on the list.",
    };
  }
}

export function getNewsletterProvider(): NewsletterProvider {
  return new NoopNewsletterProvider();
}
