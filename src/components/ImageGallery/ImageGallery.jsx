import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';


const ImageGallery = ({ hitsArray }) => {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem hitsArray={hitsArray} />
    </ul>
  );
};

ImageGallery.propTypes = {
  hitsArray: PropTypes.array.isRequired,
};


export default ImageGallery;
