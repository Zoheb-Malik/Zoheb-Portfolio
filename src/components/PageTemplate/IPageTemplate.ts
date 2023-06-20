export default interface IPageTemplate {
  header?: string;
  displayProfile?: boolean;
  children: JSX.Element | JSX.Element[];
}
