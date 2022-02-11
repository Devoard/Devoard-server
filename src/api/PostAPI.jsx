import axios from 'axios';

const PostAPI = {
  getPosts: () => {  
    axios.get('http://localhost:8000/posts')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export default PostAPI;