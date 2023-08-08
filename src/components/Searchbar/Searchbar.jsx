import { Component } from 'react';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

export class Searchbar extends Component {
  state = {
    serchValue: '',
  };

  // componentDidUpdate(_, prevState) {
  //   if (prevState.serchValue !== this.state.serchValue) {
  //     this.reset();
  //   }
  // }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.serchValue);
    this.reset();
    e.target.reset();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ serchValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.buttonLabel}>
              <IoSearch />
            </span>
          </button>

          <input
            onChange={this.handleChange}
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
}
