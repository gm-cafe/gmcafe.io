import { format } from 'date-fns';
import { APIError } from '../../lib/util/mint';

type Props = {
  error: APIError;
};

const Error = ({ error }: Props) => {
  const patronWL = new Date(1680354000000);
  const publicWL = new Date(1680386400000);
  const publicMint = new Date(1680397200000);

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
            If you have signed up for the &apos;<b>Public Waitlist</b>&apos; you will need to return
            at <b>{format(publicWL, 'haa MMMM do')}</b> to adopt your Keekusaur.
          </p>
          <p>
            If you missed both waitlist registration periods, come back at{' '}
            <b>{format(publicMint, 'haa MMMM do')}</b> for the <b>Public Mint</b>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Error;
