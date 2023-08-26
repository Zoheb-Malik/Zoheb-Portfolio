import { IPopupModal } from './IPopupModal';

export default function PopupModal({ isOpen, content, onClose }: IPopupModal) {
    return (
    <div className={`popup-modal ${isOpen ? 'open' : ''}`}>
      <div className="popup-modal-content">
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
