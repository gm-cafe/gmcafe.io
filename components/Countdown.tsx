import { formatDuration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { gmooContract, gmooABI } from './migration';

const Countdown = () => {
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: '_claimableTime',
  });
  const endTime = data ? parseInt(data.toString()) * 1000 : Date.now();
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

  return <>{timeLeft}</>;
};

export default Countdown;
