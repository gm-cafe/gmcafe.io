import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

export type Data = {
  addresses: string[];
  tokens: string[];
};

type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    Address: string;
    Token: string;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  throw new Error('API throw error test');
  return fetch(
    'https://api.airtable.com/v0/appkYCX1EewOs0WUP/API?fields%5B%5D=Token&fields%5B%5D=Address',
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        res.status(400).json({ addresses: [], tokens: [] });
      }

      return response.json();
    })
    .then(({ records }: { records: AirtableRecord[] }) => {
      const tokens = records.map(({ fields }) => fields.Token);
      const dedupedTokens = tokens.filter((token, index) => tokens.indexOf(token) === index);

      const addresses = records.map(({ fields }) => fields.Address);
      const dedupedAddresses = addresses.filter(
        (address, index) => addresses.indexOf(address) === index
      );

      res.status(200).json({ addresses: dedupedAddresses, tokens: dedupedTokens });
    });
};

export default withSentry(handler);
