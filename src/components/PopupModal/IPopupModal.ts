export interface IPopupModal {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}
