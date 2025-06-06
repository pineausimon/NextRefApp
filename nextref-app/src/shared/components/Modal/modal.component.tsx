import './modal.styles.css';

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ show, onClose, title, children }: Props) {
  if (!show) return null;
  return (
    <div className="modal-backdrop text-base-content">
      <div className="modal-box-custom">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}