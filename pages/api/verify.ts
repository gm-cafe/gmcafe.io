import { verifyMessage } from 'ethers/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '../../lib/util';

type Data = {
  message: string;
};

const _claimCard = (address: string, discordId: string) =>
  fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: address,
      discord: discordId,
    }),
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { body } = req;
    const { hash, discord, message } = JSON.parse(body);

    if (!hash || typeof hash !== 'string') {
      return res.status(400).json({ message: 'No hash found' });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'No sign message found' });
    }

    if (!discord || typeof discord !== 'string') {
      return res.status(400).json({ message: 'No discord id found' });
    }

    // TODO: Temporarily circumvent API request until backend is complete
    const _address = verifyMessage(message, hash);
    res.status(200).json({ message: 'Success' });

    // await claimCard(address, discord).then((response) => {
    //   if (!response.ok) {
    //     res.status(400).json({ message: 'Error occurred while claiming card' });
    //   } else {
    //     res.status(200).json({ message: 'Success' });
    //   }
    // });
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
}
