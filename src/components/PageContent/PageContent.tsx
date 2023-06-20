import { useState } from 'react';
import IPageContent from './IPageContent';

export default function PageContent({ title, className, removeMarginTop, children }: IPageContent) {
  const [clickCount, setClickCount] = useState(0);

  function sparkleEasterEgg() {
    const sparkleContainer = document.querySelector('.js-easter-egg');
    const sparkleContainerContent = (sparkleContainer && sparkleContainer.children[0]) || null;
    const newClickCount = clickCount + 1;

    if (newClickCount <= 5) {
      setClickCount(newClickCount);
      sparkleContainer?.classList.add('shake');
      setTimeout(() => {
        sparkleContainer?.classList.remove('shake');
      }, 500);

      if (newClickCount === 5) {
        sparkleContainerContent?.classList.add('cursor-default');
        sparkleContainer?.classList.replace('shake', 'sparkle');
      }
    }
  }

  return (
    <section className='page__section'>
      {/* <!-- Find the hidden easter egg! (#1) */}
      <div className='js-easter-egg' onClick={sparkleEasterEgg}>
        <h2 className={removeMarginTop ? 'margin--remove-top' : ''}>{title}</h2>
      </div>
      <section className={`page__section--content${className ? ` ${className}` : ''}`}>
        {children}
      </section>
    </section>
  );
}
