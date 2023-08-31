import { useState } from 'react';
import IPageContent from './IPageContent';

export default function PageContent({
  title,
  className = '',
  removeMarginTop,
  children,
}: IPageContent) {
  const [clickCount, setClickCount] = useState(0);

  function sparkleEasterEgg({ currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const content = currentTarget?.children?.[0];
    const newClickCount = clickCount + 1;

    if (newClickCount <= 5) {
      setClickCount(newClickCount);
      currentTarget?.classList.add('shake');
      setTimeout(() => {
        currentTarget?.classList.remove('shake');
      }, 500);

      if (newClickCount === 5) {
        content?.classList.add('cursor-default');
        currentTarget?.classList.replace('shake', 'sparkle');
      }
    }
  }

  return (
    <section className="page__section">
      {/* Find the hidden easter egg! (#1) */}
      <div className="easter-egg--sparkle" onClick={sparkleEasterEgg}>
        <h2 className={removeMarginTop ? 'margin--remove-top no-select' : 'no-select'}>{title}</h2>
      </div>
      <section className={`page__section--content ${className}`.trim()}>{children}</section>
    </section>
  );
}
