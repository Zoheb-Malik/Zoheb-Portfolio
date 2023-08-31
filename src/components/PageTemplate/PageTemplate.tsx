import IPageTemplate from './IPageTemplate';
import PageFooter from '../PageFooter/PageFooter';

export default function PageTemplate({ header, displayProfile, children }: IPageTemplate) {
  return (
    <>
      {header && (
        <header>
          <h1 className="page__header no-select">{header}</h1>
        </header>
      )}
      <article className="page">
        {displayProfile && (
          <section className="margin--add-bottom">
            <a href="https://www.linkedin.com/in/zoheb-malik/" target="_blank">
              <img
                className="profile__picture"
                src="https://i.imgur.com/ex3N1GF.jpeg"
                alt="Profile Picture"
              />
            </a>
          </section>
        )}
        {children}
      </article>
      <PageFooter />
    </>
  );
}
