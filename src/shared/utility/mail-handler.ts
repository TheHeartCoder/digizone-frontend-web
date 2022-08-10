import { NodeMailgun } from 'ts-mailgun';
import config from 'config';
import { MailgunTemplate } from 'ts-mailgun/dist/mailgun-template';

const mailer = new NodeMailgun();
mailer.apiKey = config.get('emailService.privateApiKey'); // Set your API key
mailer.domain = config.get('emailService.testDomain'); // Set the domain you registered earlier
mailer.fromEmail = config.get('emailService.testDomain'); // Set your from email
mailer.fromTitle = 'Digizone - Get Instand License'; // Set the name you would like to send from

mailer.init();

export const sendEmail = async (
  to: string,
  templateName: string,
  templateVars: Record<string, any> = {},
) => {
  const template = mailer.getTemplate(templateName);

  if (template && template instanceof MailgunTemplate) {
    await mailer.sendFromTemplate(to, template, templateVars).catch((error) => {
      console.error(error);
    });
  }
};
