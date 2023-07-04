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
              <img className='profile-picture' src='https://media.licdn.com/dms/image/D4E03AQFrr7SYq5o-Aw/profile-displayphoto-shrink_800_800/0/1688334497716?e=1694044800&v=beta&t=9_iQqiYAZJxqd5dKiMZglEKlU2WNVNRVIdNgjVMpr4g' alt='Profile Picture' />
            </a>
          </div>
        )}
        {children}
      </article>
    </>
  );
}
