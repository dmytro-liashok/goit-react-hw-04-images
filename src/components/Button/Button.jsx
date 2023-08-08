import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.buttonLoadMore}
        onClick={() => onClick()}
      >
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
