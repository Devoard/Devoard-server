import axios from 'axios';

const PostAPI = {
  getPosts: async() => {  
    const res = await axios.get('http://localhost:8000/posts')
    .catch(err => {
      console.log(err);
    })

    return res.data;
  },
  createPost: async(data) => {
    await axios.post('http://localhost:8000/posts', data)
    .catch(err => {
      console.log(err);
    })
  }
}

export default PostAPI;