import type { NextApiRequest, NextApiResponse } from 'next';

import { brokerSchema } from '@/pages/brokers/signup/index.data';
import type {
  IResponseData,
  TBroker,
  TBrokerEmailPayload,
  TBrokerWithHoneypot,
  TFuncHandleBrokerSignupRequest
} from '@/types/declarations';
import logger from '@/utils/logger';
import type { IGenericObjectInterface } from '@/utils/types';
import { getYupErrorsBySchema } from '@/utils/yup';
import type { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import type { ResponseError } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';
import { compressToEncodedURIComponent } from 'lz-string';

const handleBrokerSignupRequest: TFuncHandleBrokerSignupRequest = async (
  req: NextApiRequest
): Promise<boolean> => {
  const brokerWithHoneypot: TBrokerWithHoneypot = req.body;
  const { policyCountry, ...restBrokerWithHoneypot } = brokerWithHoneypot;
  const broker: TBroker = restBrokerWithHoneypot;

  // honeypot...
  if (policyCountry !== '') {
    const ip: string = (req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      '') as string;
    const userAgent: string = req.headers['user-agent'] || '';
    // log details...
    logger.trace({ ip: ip, userAgent: userAgent }, 'Honeypot Error Source');
    logger.trace(brokerWithHoneypot, 'Honeypot Error Payload');
    return true; // dubious success
  }

  const errors: IGenericObjectInterface<string> = await getYupErrorsBySchema(
    brokerSchema,
    broker
  );
  const hasErrors: boolean = Object.keys(errors).length !== 0;
  if (hasErrors) {
    return false;
  }

  sgMail.setApiKey(process.env.SENDGRIDAPIKEY ?? '');

  // send email to business to notify...
  const baseUrl: string = `${process.env.BASEBRKURL}`;
  const baseAdminUrl: string = `${process.env.BASEBRKADMINURL}`;
  const reqCode: string = compressToEncodedURIComponent(JSON.stringify(broker));
  let brokerEmailPayload: TBrokerEmailPayload = {
    ...broker,
    baseUrl: baseAdminUrl,
    reqCode: reqCode
  };
  const sendEmailToBusinessPayloadConfig: MailDataRequired = JSON.parse(
    process.env.SENDGRIDTPLBUSINESSNOTIFY ?? ''
  );
  const {
    subject: subjectEmailToBusiness,
    ...restSendEmailToBusinessPayloadConfig
  } = sendEmailToBusinessPayloadConfig;
  const sendEmailToBusinessPayload: MailDataRequired = {
    ...restSendEmailToBusinessPayloadConfig,
    dynamicTemplateData: {
      ...brokerEmailPayload,
      subject: subjectEmailToBusiness // Note: subject is template in the setting
    }
  };
  try {
    const sgMailRet: [sgMail.ClientResponse, NonNullable<unknown>] =
      await sgMail.send(sendEmailToBusinessPayload);
    logger.info(
      {
        messageType: 'business-notify',
        statusCode: sgMailRet?.[0]?.statusCode
      },
      'Email sent'
    );
  } catch (error) {
    const err: ResponseError = error as ResponseError;
    if (err?.response) {
      logger.error(
        {
          messageType: 'business-notify',
          statusCode: err?.response?.body
        },
        'Error in sending email'
      );
    }
  }

  // send thank/submitted message to the broker...
  brokerEmailPayload = {
    ...broker,
    baseUrl: baseUrl
  };
  const sendEmailToBrokerSubmittedPayloadConfig: MailDataRequired = JSON.parse(
    process.env.SENDGRIDTPLBRKSUBMITTED ?? ''
  );
  const {
    subject: subjectEmailToBrokerSubmitted,
    ...restSendEmailToBrokerSubmittedPayloadConfig
  } = sendEmailToBrokerSubmittedPayloadConfig;
  const sendEmailToBrokerSubmittedPayload: MailDataRequired = {
    to: broker.email,
    ...restSendEmailToBrokerSubmittedPayloadConfig,
    dynamicTemplateData: {
      ...brokerEmailPayload,
      subject: subjectEmailToBrokerSubmitted
    }
  };
  try {
    const sgMailRet: [sgMail.ClientResponse, NonNullable<unknown>] =
      await sgMail.send(sendEmailToBrokerSubmittedPayload);
    logger.info(
      {
        messageType: 'broker-submitted',
        statusCode: sgMailRet?.[0]?.statusCode
      },
      'Email sent'
    );
  } catch (error) {
    const err: ResponseError = error as ResponseError;
    if (err?.response) {
      logger.error(
        {
          messageType: 'broker-submitted',
          statusCode: err?.response?.body
        },
        'Error in sending email'
      );
    }
  }

  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  switch (req.method) {
    case 'POST':
      try {
        if (await handleBrokerSignupRequest(req)) {
          res.status(200).end();
        } else {
          res.status(403).end();
        }
      } catch (error) {
        logger.error(error, 'Error');
        res.status(500).json({
          error: 'Internal Server Error: ' + (error as Error)?.message
        });
      }

      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
