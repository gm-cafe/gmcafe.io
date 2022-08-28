import { formatDuration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import useContractRead from '../lib/hooks/useContractRead';
import { Discord } from './StyledLinks';

const Countdown = () => {
  const { data } = useContractRead({
    functionName: '_claimableTimexx',
  });
  const endTime = data ? parseInt(data.toString()) * 1000 : 0;
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const duration = intervalToDuration({
    start: time,
    end: endTime,
  });
  const timeLeft = formatDuration(duration, {
    format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes'],
  });

  return time > endTime ? (
    <>
      Migration has ended. If you own a Cow and did not get a chance to migrate in time, don&apos;t
      stress! Please open a support ticket in <Discord />.
    </>
  ) : (
    <>Migration ends in {timeLeft}.</>
  );
};

export default Countdown;
