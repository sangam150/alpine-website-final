declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface Mailchimp {
    setConfig(config: MailchimpConfig): void;
    lists: {
      addListMember(listId: string, body: {
        email_address: string;
        status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
        merge_fields?: Record<string, any>;
      }): Promise<any>;
    };
  }

  const mailchimp: Mailchimp;
  export default mailchimp;
} 