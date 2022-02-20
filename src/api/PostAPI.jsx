import axios from 'axios';

const url = 'http://localhost:8000';

const PostAPI = {
  getPosts: async() => {  
    const res = await axios.get(`${url}/posts`)
    .catch(err => {
      console.log(err);
    })

    return res.data;
  },
  getDetailPost: async(id) => {
    const res = await axios.get(`${url}/posts/${id}`)
    .catch(err => {
      console.log(err);
    })

    return res.data;
  },
  createPost: async(data) => {
    await axios.post(`${url}/posts`, data)
    .catch(err => {
      console.log(err);
    })
  },
  updatePost: async(id, data) => {
    await axios.patch(`${url}/posts/${id}`, data)
    .catch(err => {
      console.log(err);
    })
  },
  removePost: async(id) => {
    await axios.delete(`${url}/posts/${id}`)
    .catch(err => {
      console.log(err);
    })
  }
}

export default PostAPI;