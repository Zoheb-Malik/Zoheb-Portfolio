import IPageTemplate from "./IPageTemplate";

export default function PageTemplate({ header, children }: IPageTemplate) {
  return (
    <>
      {header && (
        <header>
          <h1 className="page--header">{header}</h1>
        </header>
      )}
      <article className="page">{children}</article>
    </>
  );
}
