import { format } from 'date-fns';
import { APIError } from '../../lib/util/mint';

type Props = {
  error: APIError;
};

const Error = ({ error }: Props) => {
  const patronWL = new Date(1680397200000);

  return (
    <div className="mt-4 flex-grow">
      {error === 'noReservation' && (
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-purple">
          <p>Uh oh, it appears you do not have a Reservation (WL).</p>
          <p>
            If you have signed up for the &apos;
            <b>Patron Waitlist</b>&apos; you will need to return at{' '}
            <b>{format(patronWL, 'haa MMMM do')}</b> to adopt your Keekusaur.
          </p>
          <p>
            If you missed the Patron Waitlist registration period, you can register for the Public
            Mint phase on{' '}
            <a
              className="font-bold text-[#6C5DD3] underline"
              rel="noreferrer"
              target="_blank"
              href="https://heymint.xyz/good-morning-cafe-public"
            >
              HeyMint
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Error;
