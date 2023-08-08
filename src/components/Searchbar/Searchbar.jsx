import { useState } from 'react';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
    e.target.reset();
  };

  const handleChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.buttonLabel}>
            <IoSearch />
          </span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="serchValue"
        />
      </form>
    </header>
  );
}
