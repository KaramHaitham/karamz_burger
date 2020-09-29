import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://karamz-burger.firebaseio.com/'
});

export default instance;