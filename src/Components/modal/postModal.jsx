import { Link } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import logApi from '../../api/logApi'
import { GlobalContext } from '../../config/GlobalState'
// import setTime from '../../config/setTime'
import { compressAccurately } from 'image-conversion'
// import FollowModal from './FollowModal'
import PropTypes from 'prop-types';
import "./PostModal.css"

export default function PostModal({ post }) {
  const [isLike, setIsLike] = useState(post.isLike)
  const [comment, setComment] = useState('')
  const [postModal, setPostModal] = useState([])
  const { loggedUser } = useContext(GlobalContext)
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(post.imageUrl)
  const createPostCaptionRef = useRef()

  async function handleImages(e) {
    if (e.target.files[0].size > 900 * 900) {
      const compressedImageBlob = await compressAccurately(e.target.files[0], 900)
      const compressedImage = new File([compressedImageBlob], 'photologue-compressed-image', { type: 'image/jpeg' })
      setImages(compressedImage)
      setImagesPreview(URL.createObjectURL(compressedImage))
    } else {
      setImagesPreview(URL.createObjectURL(e.target.files[0]))
      setImages(e.target.files[0])
    }
  }


  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await logApi.likePost(data, token)
    console.log(like.message)
    postModal.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await logApi.unlikePost(data, token)
    console.log(unlike.message)
    postModal.totalLikes--
    setIsLike(false)
  }

  async function createPost(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', images)

    const imageUrl = await logApi.uploadImage(formData, token)

    const data = {
      imageUrl: imageUrl.url,
      caption: createPostCaptionRef.current.value,
    }

    const newPost = await logApi.createPost(data, token)
    alert(newPost.message)
    window.location.reload()
  }
  async function deletePost(e) {
    try {
      e.preventDefault()
      let text = 'Are you sure to delete this post?'
      if (confirm(text) === true) {
        const postId = postModal.id
        const deletePost = await logApi.deletePost(postId, token)
        window.location.reload()
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  async function createComment(e) {
    e.preventDefault()

    const data = {
      postId: post.id,
      comment: comment,
    }

    const createComment = await logApi.createComment(data, token)

    setComment('')
    getPostById(post.id)
    alert(createComment.message)
  }

  async function deleteComment(e, id) {
    e.preventDefault()

    let text = 'Are you sure to delete this comment?'
    if (confirm(text) === true) {
      const deleteComment = await logApi.deleteComment(id, token)
      console.log(deleteComment)
      getPostById(post.id)
    }
  }

  async function getPostById(id) {
    const getPostId = await logApi.getPostById(id, token)
    getPostId.data.totalLikes = post.totalLikes
    getPostId.data.isLike = post.isLike
    setPostModal(getPostId.data)
  }

  async function doubleClickToLike(e, id) {
    const heartIcon = document.querySelector(`.heart-icon-${id}`)
    setTimeout(() => {
      heartIcon.style.scale = '1.5'
    }, 0)
    setTimeout(() => {
      heartIcon.style.scale = '1'
    }, 200)
    setTimeout(() => {
      heartIcon.style.scale = '0'
    }, 600)
    likePost(e, id)
  }

  useEffect(() => {
    getPostById(post.id)
  }, [])

  return (
    <>
      {/* Post Modal */}
      <div className="modal fade postModal" id={`postModal${postModal.id}`} tabIndex={-1} aria-labelledby="postModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-body ">
              <div className='button-close d-flex justify-content-end'>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <section id={`post${postModal.id}`} className="post">
                <div className="h-100 border-bottom post__content">
                  <Link to={`/u/${postModal.user?.id}`} className="text-decoration-none">
                    <div className="post__content-header d-inline" data-bs-dismiss="modal" aria-label="Close">
                      <img src={postModal.user?.profilePictureUrl} alt="" />
                      <span className="fw-bold ps-2">{postModal.user?.username}</span>
                    </div>
                  </Link>

                  <div className="post__content-image">
                    <img src={postModal.imageUrl} alt="" className="pt-3" onDoubleClick={(e) => doubleClickToLike(e, postModal.id)} />
                  </div>

                  <div className="post__content-icons  d-flex gap-3 justify-content-center gap-2">
                    
                  <div className="post__content-likes">
                    <p className="fw-bold m-0 pb-2">
                      <span>
                        {postModal.totalLikes === 0 ? (
                          <>
                            <span className="fw-normal">Be first to </span>like this
                          </>
                        ) : (
                          <>
                            {postModal.totalLikes} {postModal.totalLikes === 1 ? 'like' : 'likes'}
                          </>
                        )}
                      </span>
                      {/* <span className="fw-light"> - {post.createdAt !== post.updatedAt ? 'Edited · ' : ''}{setTime(postModal.createdAt)}</span> */}
                    </p>
                  </div>

                    <div className="post__content-icons-left d-flex gap-2">
                      {isLike ? <i className="bx bxs-heart fs-2 text-danger" onClick={(e) => unlikePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart fs-2" onClick={(e) => likePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i>}
                      <i className="bx bx-message-rounded fs-2" onClick={() => document.getElementById('comment-input').focus()}></i>
                      {/* <i className="bx bx-share-alt"></i> */}
                    </div>
                    <div className="post__content-icons-right">
                      {postModal.user?.id === loggedUser.id ? (
                        <>
                          {/* <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${postModal.id}`}></i> */}
                          <i className="bx bx-trash fs-3" onClick={deletePost}></i>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="post__content-caption mb-3 ms-3">
                    <Link to={`/u/${postModal.user?.id}`} className="fw-bold text-decoration-none text-black">
                      {/* <img src={postModal.user?.profilePictureUrl} alt="" data-bs-dismiss="modal" aria-label="Close" /> */}
                      <span data-bs-dismiss="modal" aria-label="Close">
                        {' '}
                        {postModal.user?.username}
                      </span>
                    </Link>
                    <span> {postModal.caption}</span>
                  </div>
                  <div className="post__content-comment">
                    {postModal.comments && 
                      postModal.comments.map((comment, i) => {
                        return (
                          <div key={i} className="d-flex justify-content-between">
                            <span>
                              <Link to={`/u/${comment.user?.id}`} className="fw-bold text-decoration-none text-black">
                                <img src={comment.user?.profilePictureUrl} alt="" data-bs-dismiss="modal" aria-label="Close" /> 
                                <span data-bs-dismiss="modal" aria-label="Close">
                                  {' '}
                                  {comment.user.username}
                                </span>
                              </Link>{' '}
                              {comment.comment} 
                            </span>
                            <span>{comment.user.id === loggedUser.id ? <i className="bx bxs-trash-alt" onClick={(e) => deleteComment(e, comment.id)}></i> : null}</span>
                          </div>
                        )
                      })}
                    <form>
                      <input id="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                      {comment && <button onClick={createComment}>Post</button>}
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="modal fade createPost" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="createPostModalLabel">
                Create Post
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-upload">
                  <label htmlFor={`chooseImageCreatePost`} className="form-label">
                    <i className="bx bxs-cloud-upload"></i> Choose Image
                  </label>
                  <input id={`chooseImageCreatePost`} type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
                </div>
                <div className="input-box">
                  <span className="input-box__icon">
                    <i className="bx bxs-edit"></i>
                  </span>
                  <input ref={createPostCaptionRef} type="text" autoComplete="new-password" required />
                  <label>Caption</label>
                </div>
              </form>
              <div className="mb-3 image-preview d-flex justify-content-center">
                {images && (
                  <>
                    <img src={imagesPreview} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={(e) => createPost(e)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

PostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLike: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      profilePictureUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          profilePictureUrl: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }),
      })
    ),
  }).isRequired,
};
