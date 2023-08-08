import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchHits from '../services/hits-api';
import css from './App.module.css';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const fetchArticles = async () => {
      setIsLoader(true);
      try {
        const response = await fetchHits(searchValue, page);
        const { hits, totalHits } = response;
        const totalPages = Math.ceil(totalHits / 12);
        const isLoadMore = page < totalPages;

        if (hits.length === 0) {
          toast.warn('Pictures not found.');
          return;
        }

        if (page >= totalPages) {
          toast.warn('Oops, no more pictures');
        }
        setIsLoadMoreBtn(true);
        setIsLoadMoreBtn(isLoadMore);
        setHits(prevHits => [...prevHits, ...hits]);
      } catch (error) {
        toast.error('Oops! Something went wrong! Please try again!');
      } finally {
        setIsLoader(false);
      }
    };
    fetchArticles();
  }, [searchValue, page]);

  const formSubmitValue = searchValue => {
    if (!searchValue.trim()) {
      return;
    }
    setSearchValue(searchValue);
    setHits([]);
    setIsLoadMoreBtn(false);
    setPage(1);
  };

  const pageIncrement = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={formSubmitValue} />
      <ImageGallery hitsArray={hits} />
      {isLoadMoreBtn && <Button onClick={pageIncrement} />}
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
