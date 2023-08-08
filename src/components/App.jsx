import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchHits from '../services/hits-api';
import css from './App.module.css';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    hits: [],
    page: 1,
    isLoader: false,
    isLoadMoreBtn: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.searchValue !== searchValue) {
      this.setState({
        isLoader: true,
      });
      try {
        fetchHits(searchValue, page)
          .then(response => {
            const hits = response.hits;
            if (hits.length === 0) {
              toast.warn('Pictures not found.');
              return;
            }
            this.setState({
              hits,
              isLoadMoreBtn: true,
            });
          })
          .finally(() => {
            this.setState({
              isLoader: false,
            });
          });
      } catch (error) {
        toast.error('Oops! Something went wrong! Please try again!');
      }
    }
  }

  formSubmitValue = searchValue => {
    if (!searchValue.trim()) {
      return;
    }

    this.setState({
      searchValue,
      hits: [],
      isLoadMoreBtn: false,
      page: 1,
    });
  };

  pageIncrement = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.updatePage(this.state.page);
      }
    );
  };

  updatePage(nextPage) {
    try {
      fetchHits(this.state.searchValue, nextPage).then(response => {
        const totalHits = response.totalHits;
        const hits = response.hits;
        if (this.state.page >= Math.ceil(totalHits / 12)) {
          toast.warn('Oops, no more pictures');
        }
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          isLoadMoreBtn: this.state.page < Math.ceil(totalHits / 12),
        }));
      });
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
    }
  }

  render() {
    const { isLoader, hits, isLoadMoreBtn } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.formSubmitValue} />
        <ImageGallery hitsArray={hits} />
        {isLoadMoreBtn && <Button onClick={this.pageIncrement} />}
        {isLoader && <Loader />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
}
