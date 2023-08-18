import axiosClient from "./axios.Client"

const logApi = {
  loginUser: (email, password) => {
    const url = 'login'
    return axiosClient.post(url, { email: email, password: password })
  },

  logoutUser: (token) => {
    const url = 'logout'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  registerUser: (data) => {
    const url = 'register'
    return axiosClient.post(url, data)
  },

  getLoggedUser: (token) => {
    const url = 'user'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  getUserById: (id, token) => {
    const url = 'user/' + id
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  updateUserProfile: (data, token) => {
    const url = 'update-profile'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  followUser: (data, token) => {
    const url = 'follow'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  unfollowUser: (id, token) => {
    const url = 'unfollow/' + id
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  getMyFollowing: (token, { params }) => {
    const url = 'my-following'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  getMyFollowers: (token, { params }) => {
    const url = 'my-followers'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  getFollowingByUserId: (id, token, { params }) => {
    const url = 'following/' + id
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  getFollowersByUserId: (id, token, { params }) => {
    const url = 'followers/' + id
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  createPost: (data, token) => {
    const url = 'create-post'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  updatePost: (id, data, token) => {
    const url = 'update-post/' + id
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  deletePost: (id, token) => {
    const url = 'delete-post/' + id
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  getExplorePost: (token, { params }) => {
    const url = 'explore-post'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  getFollowingPost: (token, { params }) => {
    const url = 'following-post'
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  getPostById: (id, token) => {
    const url = 'post/' + id
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  getPostByUserId: (id, token, { params }) => {
    const url = 'users-post/' + id
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` }, params })
  },

  createComment: (data, token) => {
    const url = 'create-comment'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  deleteComment: (id, token) => {
    const url = 'delete-comment/' + id
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${token}` } })
  },

  likePost: (data, token) => {
    const url = 'like'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  unlikePost: (data, token) => {
    const url = 'unlike'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
  },

  uploadImage: (data, token) => {
    const url = 'upload-image'
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
  },
}

export default logApi
