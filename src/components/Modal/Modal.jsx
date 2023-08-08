import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const ModalEl = document.querySelector('#id-modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeOnOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.closeOnOverlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      ModalEl
    );
  }
}
export default Modal;
