import { formatDuration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

type CountdownProps = {
  endTime: number;
};

const Countdown = ({ endTime }: CountdownProps) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const duration = intervalToDuration({
    start: time,
    end: endTime,
  });
  const timeLeft = formatDuration(duration);

  return <>{timeLeft}</>;
};

export default Countdown;
