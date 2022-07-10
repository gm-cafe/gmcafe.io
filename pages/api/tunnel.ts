import { withSentry, captureException } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

// Change host appropriately if you run your own Sentry instance.
const sentryHost = 'o1313245.ingest.sentry.io';

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
const knownProjectIds: string[] = ['6563016'];

type Data = {
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const envelope = req.body;
    const pieces = envelope.split('\n');

    const header = JSON.parse(pieces[0]);

    const { host, pathname } = new URL(header.dsn);
    if (host !== sentryHost) {
      throw new Error(`invalid host: ${host}`);
    }

    const projectId = pathname.endsWith('/') ? pathname.substring(1, -1) : pathname.slice(1);
    if (!knownProjectIds.includes(projectId)) {
      throw new Error(`invalid project id: ${projectId}`);
    }

    const endpoint = `https://${sentryHost}/api/${projectId}/envelope/`;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: envelope,
    });
    return response.json();
  } catch (e) {
    console.error('hmm', e)
    captureException(e);
    return res.status(400).json({ status: 'invalid request' });
  }
};

export default withSentry(handler);
