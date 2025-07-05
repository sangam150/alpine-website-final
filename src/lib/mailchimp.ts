import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const addToNewsletter = async (email: string, firstName?: string) => {
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
        },
      }
    );
    return { success: true, data: response };
  } catch (error: unknown) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter' 
    };
  }
};

export const checkNewsletterStatus = async (email: string) => {
  try {
    const response = await mailchimp.lists.getListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      email
    );
    return { success: true, status: response.status };
  } catch {
    return { success: false, status: 'not_found' };
  }
}; 