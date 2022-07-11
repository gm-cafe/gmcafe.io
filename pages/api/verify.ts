import { verifyMessage } from 'ethers/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

type Data = {
  message: string;
};

const addRecord = (address: string, tokens: string[]) => {
  const records =
    tokens.length > 0
      ? tokens.map((token) => ({
          fields: {
            Address: address,
            Token: token,
          },
        }))
      : [
          {
            fields: {
              Address: address,
              Notes: 'Manual verification required',
            },
          },
        ];

  return fetch('https://api.airtable.com/v0/appkYCX1EewOs0WUP/API', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: records,
    }),
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { body } = req;
    const { hash, tokens: _tokens, message } = JSON.parse(body);

    if (!hash || typeof hash !== 'string') {
      return res.status(400).json({ message: 'No hash found...' });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'No sign message found...' });
    }

    const tokens: string[] = Array.isArray(_tokens) ? _tokens : [];

    const address = verifyMessage(message, hash);
    await addRecord(address, tokens).then((response) => {
      if (!response.ok) {
        res.status(400).json({ message: 'Error occurred while storing address...' });
      } else {
        res.status(200).json({ message: 'SUCCESS! Address received.' });
      }
    });
  } else {
    res.status(400).json({ message: 'Bad request...' });
  }
};

export default withSentry(handler);
