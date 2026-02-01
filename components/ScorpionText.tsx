
import React, { useState, useEffect } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  repeat?: boolean;
}

const ScorpionText: React.FC<Props> = ({ text, speed = 50, className = "", delay = 1000, repeat = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: any;
    const handleType = () => {
      const isFull = !isDeleting && displayedText === text;
      const isEmpty = isDeleting && displayedText === '';

      if (isFull) {
        if (!repeat && loopNum > 0) return;
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isEmpty) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        const nextText = isDeleting 
          ? text.substring(0, displayedText.length - 1)
          : text.substring(0, displayedText.length + 1);
        
        setDisplayedText(nextText);
        timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
      }
    };

    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed, delay, repeat, loopNum]);

  return (
    <span className={`${className} font-terminal`}>
      {displayedText}
      <span className="animate-pulse border-r-2 border-[var(--neon-accent)] ml-1">&nbsp;</span>
    </span>
  );
};

export default ScorpionText;
