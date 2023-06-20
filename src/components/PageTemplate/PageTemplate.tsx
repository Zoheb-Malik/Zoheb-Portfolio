import IPageTemplate from './IPageTemplate';

export default function PageTemplate({ header, displayProfile, children }: IPageTemplate) {
  return (
    <>
      {header && (
        <header>
          <h1 className='page__header'>{header}</h1>
        </header>
      )}
      <article className='page'>
        {displayProfile && (
          <div className='margin--add-bottom'>
            <a href='https://www.linkedin.com/in/zoheb-malik/' target='_blank'>
              <img className='profile-picture' src='https://i.imgur.com/TebqHcU.jpeg' alt='Profile Picture' />
            </a>
          </div>
        )}
        {children}
      </article>
    </>
  );
}
