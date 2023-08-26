import { IPopupModal } from './IPopupModal';

import '../../styles/components/PopupModal.scss';



export default function PopupModal({ isOpen, onClose, children }: IPopupModal) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
