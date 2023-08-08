import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ hitsArray }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clickedImageId, setClickedImageId] = useState(null);

  const togleModal = itemId => {
    setIsOpenModal(!isOpenModal);
    setClickedImageId(itemId);
  };

  return hitsArray.map(hit => (
    <React.Fragment key={hit.id}>
      <li
        className={css.ImageGalleryItem}
        onClick={() => {
          togleModal(hit.id);
        }}
      >
        <img
          className={css.ImageGalleryItemImage}
          src={hit.webformatURL}
          alt={hit.user}
        />
      </li>
      {isOpenModal && clickedImageId === hit.id && (
        <Modal onClose={togleModal}>
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
