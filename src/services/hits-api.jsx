import axios from 'axios';
import { toast } from 'react-toastify';

async function fetchHits(searchValue, page) {
  try {
    const respons = await axios.get(
      `https://pixabay.com/api/?&q=${searchValue}&page=${page}&key=10288621-f6b00deda1a1cc64bb1ecec3b&image_type=photo&orientation=horizontal&per_page=12`
    );
    return respons.data;
  } catch (error) {
    toast.error('Oops! Something went wrong! Please try again!');
  }
}

export default fetchHits;
