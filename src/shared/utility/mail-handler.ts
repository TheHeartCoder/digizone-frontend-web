import { NodeMailgun } from 'ts-mailgun';
import config from 'config';
import { MailgunTemplate } from 'ts-mailgun/dist/mailgun-template';
import FormData from 'form-data';
import axios from 'axios';

const mailer = new NodeMailgun();
mailer.apiKey = config.get('emailService.privateApiKey'); // Set your API key
mailer.domain = config.get('emailService.testDomain'); // Set the domain you registered earlier
mailer.fromEmail = config.get('emailService.testEmail'); // Set your from email
mailer.fromTitle = 'Digizone - Get Instand License'; // Set the name you would like to send from
mailer.init();

export const sendEmails = async (
  to: string,
  templateName: string,
  templateVars: Record<string, any> = {},
) => {
  console.log('templateVars :: ', templateVars);
  console.log(to);
  console.log(mailer);

  const template = mailer.getTemplate(templateName);
  console.log('template :: ', templateName, template);
  mailer
    .send(to, 'Hello!', '<h1>hsdf</h1>')
    .then((result) => console.log('Done', result))
    .catch((error) => console.error('Error: ', error));

  if (template && template instanceof MailgunTemplate) {
    const res = await mailer
      .sendFromTemplate(to, template, templateVars)
      .catch((error) => {
        console.error(error);
      });
    console.log('res :: ', res);
    return res;
  }
  console.log('ress ::XX ');
  return null;
};

export const sendEmail = async (
  to: string,
  templateName: string,
  subject: string,
  templateVars: Record<string, any> = {},
) => {
  try {
    // make form-data
    const form = new FormData();
    // form.append('from', `"${config.get('emailService.testEmail')}"`);
    form.append(
      'from',
      'mailgun@sandbox4ea7cfe84fde4fbcb3bf6b9157156213.mailgun.org',
    );
    form.append('to', to);
    form.append('subject', subject);
    form.append('template', templateName);
    // run loop on object
    Object.keys(templateVars).forEach((key) => {
      form.append(`v:${key}`, templateVars[key]);
    });
    console.log('form :: ', form);
    const username = 'api';
    const password = config.get('emailService.privateApiKey');

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const response = await axios({
      method: 'post',
      url: `https://api.mailgun.net/v3/${config.get(
        'emailService.testDomain',
      )}/messages`,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${encodedToken}`,
      },
    });
    console.log('data :: ', response.data);
  } catch (error) {
    console.error(error);
  }
};
