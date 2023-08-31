import { useState, useEffect } from 'react';
import IDynamicMessages from './IDynamicMessages';

export default function DynamicMessages({ ...args }: IDynamicMessages) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % args.messages.length);
      },
      parseInt(args.duration) * 1000,
    );

    return () => clearInterval(interval);
  }, [args.messages, args.duration]);

  return (
    <div className={args?.className}>
      <h1 className="no-select">{args.messages[messageIndex]}</h1>
    </div>
  );
}
