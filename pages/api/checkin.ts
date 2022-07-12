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

type AirtableData = { records: AirtableRecord[]; offset?: string };

const fetchRows = (res: NextApiResponse<Data>, offset?: string): Promise<AirtableData> =>
  fetch(
    `https://api.airtable.com/v0/appkYCX1EewOs0WUP/API?fields%5B%5D=Token&fields%5B%5D=Address${
      offset ? `&offset=${offset}` : ''
    }`,
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
    .catch(console.error);

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const records: AirtableRecord[] = [];

  let response = await fetchRows(res);

  let offset = response.offset;
  records.push(...response.records);

  while (offset) {
    response = await fetchRows(res, offset);
    offset = response.offset;
    records.push(...response.records);
  }

  const tokens = records.map(({ fields }) => fields.Token);
  const dedupedTokens = tokens.filter((token, index) => tokens.indexOf(token) === index);

  const addresses = records.map(({ fields }) => fields.Address);
  const dedupedAddresses = addresses.filter(
    (address, index) => addresses.indexOf(address) === index
  );

  res.status(200).json({ addresses: dedupedAddresses, tokens: dedupedTokens });
};

export default withSentry(handler);
