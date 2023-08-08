import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const ModalEl = document.querySelector('#id-modal-root');

export default function Modal({ onClose, children }) {
  const closeOnEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [closeOnEsc]);

  const closeOnOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={closeOnOverlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    ModalEl
  );
}
