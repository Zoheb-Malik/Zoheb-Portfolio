export default interface IPageContent {
  title?: string;
  className?: string;
  removeMarginTop?: boolean;
  children: JSX.Element | JSX.Element[];
}
