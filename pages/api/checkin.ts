import { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  count: number;
};

type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    Token: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return fetch('https://api.airtable.com/v0/appkYCX1EewOs0WUP/API?fields%5B%5D=Token', {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        res.status(400).json({ count: -1 });
      }

      return response.json();
    })
    .then(({ records }: { records: AirtableRecord[] }) => {
      const tokens = records.map(({ fields }) => fields.Token);
      const count = new Set(tokens).size;
      res.status(200).json({ count });
    });
}
