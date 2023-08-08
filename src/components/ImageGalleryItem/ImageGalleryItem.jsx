import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    clickedImageId: null,
  };

  togleModal = itemId => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
      clickedImageId: itemId,
    }));
  };

  render() {
    const { hitsArray } = this.props;
    return hitsArray.map(hit => (
      <React.Fragment key={hit.id}>
        <li
          className={css.ImageGalleryItem}
          onClick={() => {
            this.togleModal(hit.id);
          }}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={hit.webformatURL}
            alt={hit.user}
          />
        </li>
        {this.state.isOpenModal && this.state.clickedImageId === hit.id && (
          <Modal onClose={this.togleModal}>
            <img
              src={hit.largeImageURL}
              alt={hit.user}
              className={css.imgModal}
            />
          </Modal>
        )}
      </React.Fragment>
    ));
  }
}

export default ImageGalleryItem;
