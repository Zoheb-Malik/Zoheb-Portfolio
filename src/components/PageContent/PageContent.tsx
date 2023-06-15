import IPageContent from "./IPageContent";

export default function PageContent({ title, className, removeMarginTop, children }: IPageContent) {
  return (
    <section className="page__section">
      <h2 className={removeMarginTop ? "remove--margin-top" : ""}>{title}</h2>
      <section className={`page__section--content${(" " + className) ?? ""}`}>
        {children}
      </section>
    </section>
  );
}
