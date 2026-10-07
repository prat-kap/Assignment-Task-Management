import type { NextApiRequest, NextApiResponse } from 'next';

import { getConditionalSchemaValidate } from '@/pages/admin/brokers/validate/[action]/[reqCode]/index.data';
import type {
  IResponseData,
  TBrokerValidate,
  TBrokerValidateEmailPayload,
  TFuncHandleBrokerValidate
} from '@/types/gobal';
import { createUserInAD } from '@/utils/graphApi/createUserInAD';
import logger from '@/utils/logger';
import type { IGenericObjectInterface } from '@/utils/types';
import { getYupErrorsBySchema } from '@/utils/yup';
import type { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import type { ResponseError } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';
import type * as yup from 'yup';

const handleBrokerValidate: TFuncHandleBrokerValidate = async (
  brokerValidate: TBrokerValidate
): Promise<boolean> => {
  const conditionalSchemaValidate: yup.ObjectSchema<yup.Maybe<yup.AnyObject>> =
    getConditionalSchemaValidate(brokerValidate.action);
  const errors: IGenericObjectInterface<string> = await getYupErrorsBySchema(
    conditionalSchemaValidate,
    brokerValidate
  );
  const hasErrors: boolean = Object.keys(errors).length !== 0;
  if (hasErrors) {
    return false;
  }

  sgMail.setApiKey(process.env.SENDGRIDAPIKEY ?? '');

  const baseUrl: string = `${process.env.BRKBASEURL}`;
  const brokerValidateEmailPayload: TBrokerValidateEmailPayload = {
    ...brokerValidate,
    baseUrl: baseUrl
  };

  switch (brokerValidate.action) {
    case 'approve':
      {
        const isCreatedUser: boolean = await createUserInAD(brokerValidate);

        if (isCreatedUser === false) {
          return false;
        }

        // send email to broker with invite/login link
        const sendEmailToBrokerApprovedPayloadConfig: MailDataRequired =
          JSON.parse(process.env.SENDGRIDTPLBRKAPPROVED ?? '');
        const {
          subject: subjectEmailToBrokerApproved,
          ...restSendEmailToBrokerApprovedPayloadConfig
        } = sendEmailToBrokerApprovedPayloadConfig;
        const sendEmailToBrokerApprovedPayload: MailDataRequired = {
          to: brokerValidate.email,
          ...restSendEmailToBrokerApprovedPayloadConfig,
          dynamicTemplateData: {
            ...brokerValidateEmailPayload,
            subject: subjectEmailToBrokerApproved
          }
        };
        try {
          logger.trace(
            sendEmailToBrokerApprovedPayload,
            'sendEmailToBrokerApprovedPayload'
          );
          const sgMailRet: [sgMail.ClientResponse, NonNullable<unknown>] =
            await sgMail.send(sendEmailToBrokerApprovedPayload);
          logger.trace(sgMailRet, 'sgMailRet');
          logger.info('Email sent');
        } catch (error) {
          const err: ResponseError = error as ResponseError;
          if (err?.response) {
            logger.error(err?.response?.body, 'Error in sending email');
          }
        }
      }
      break;

    case 'reject':
      {
        // send email to broker with rejection reason
        const sendEmailToBrokerRejectedPayloadConfig: MailDataRequired =
          JSON.parse(process.env.SENDGRIDTPLBRKREJECTED ?? '');
        const {
          subject: subjectEmailToBrokerRejected,
          ...restSendEmailToBrokerRejectedPayloadConfig
        } = sendEmailToBrokerRejectedPayloadConfig;
        const sendEmailToBrokerRejectedPayload: MailDataRequired = {
          to: brokerValidate.email,
          ...restSendEmailToBrokerRejectedPayloadConfig,
          dynamicTemplateData: {
            ...brokerValidateEmailPayload,
            subject: subjectEmailToBrokerRejected
          }
        };
        try {
          logger.trace(
            sendEmailToBrokerRejectedPayload,
            'sendEmailToBrokerRejectedPayload'
          );
          const sgMailRet: [sgMail.ClientResponse, NonNullable<unknown>] =
            await sgMail.send(sendEmailToBrokerRejectedPayload);
          logger.trace(sgMailRet, 'sgMailRet');
          logger.info('Email sent');
        } catch (error) {
          const err: ResponseError = error as ResponseError;
          if (err?.response) {
            logger.error(err?.response?.body, 'Error in sending email');
          }
        }
      }
      break;
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
        if (await handleBrokerValidate(req.body)) {
          res.status(200).end();
        } else {
          res.status(403).end();
        }
      } catch (error) {
        logger.error(error, 'Error');
        res.status(500).json({ error: 'Internal Server Error' });
      }

      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
