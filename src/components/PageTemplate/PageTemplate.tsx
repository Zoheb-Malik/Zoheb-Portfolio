import IPageTemplate from './IPageTemplate';

export default function PageTemplate({ header, children }: IPageTemplate) {
  return (
    <>
      {header && (
        <header>
          <h1 className='page__header'>{header}</h1>
        </header>
      )}
      <article className='page'>{children}</article>
    </>
  );
}
