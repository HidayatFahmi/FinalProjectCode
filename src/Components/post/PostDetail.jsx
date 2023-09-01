import { Link } from 'react-router-dom'
import './PostDetail.css'
import { useContext, useEffect, useState } from 'react'
import logApi from '../../api/logApi'
import { GlobalContext } from '../../config/GlobalState'
import PropTypes from 'prop-types'

export default function PostDetail({post}) {
  const [isLike, setIsLike] = useState(post.isLike)
  const [comment, setComment] = useState('')
  const { loggedUser, token } = useContext(GlobalContext)

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await logApi.likePost(data, token)
    console.log(like.message)
    post.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await logApi.unlikePost(data, token)
    console.log(unlike.message)
    post.totalLikes--
    setIsLike(false)
  }


  async function createComment(e) {
    e.preventDefault()

    const data = {
      postId: post.id,
      comment: comment,
    }

    const createComment = await logApi.createComment(data, token)

    setComment('')
    alert(createComment.message)
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
    if (!isLike) likePost(e, id)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timelinePost__show')
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.timelinePost__hidden')
    hiddenElements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <section id="timelinePost" className="timelinePost">
      <div className="h-100 border-bottom timelinePost__content timelinePost__hidden mt-3">
        <div className="timelinePost__content-image">
          <img className="mb-3" src={post.imageUrl} alt="" onDoubleClick={(e) => doubleClickToLike(e, post.id)} />
        </div>
        <div className="timelinePost__content-icons">
          <div className="timelinePost__content-icons-left fs-2">
            {isLike ? <i className="bx bxs-heart me-3 text-danger" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart me-3" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
            <i className="bx bx-message-rounded me-3" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`}></i>
            <i className="bx bx-share-alt" data-tooltip-id="tooltip-share" data-tooltip-content="Coming Soon!"></i>
          </div>
          <div className="timelinePost__content-icons-right">
            {post.user?.id === loggedUser.id ? (
              <>
                {/* <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${post.id}`}></i> */}
                {/* <i className="bx bx-trash" onClick={deletePost}></i> */}
              </>
            ) : null}
          </div>
        </div>
        <div className="timelinePost__content-likes">
          <p className="fw-bold m-0 pb-2">
            <span>
              {post.totalLikes === 0 ? (
                <>
                  <span className="fw-normal">Be first to </span>like this
                </>
              ) : (
                <>
                  {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                </>
              )}
            </span>
          </p>
        </div>
        <div className="timelinePost__content-caption mb-2">
          <Link to={`/u/${post.user?.id}`} className="fw-bold text-decoration-none text-black">
            {post.user?.username}
          </Link>{' '}
          {post.caption}
        </div>
        <div className="timelinePost__content-comment">
          <form>
            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            {comment && <button className="btn btn-primary" onClick={createComment}>Post</button>}
          </form>
        </div>
      </div>
    </section>
  )
}


PostDetail.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        profilePictureUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
      imageUrl: PropTypes.string.isRequired,
      isLike: PropTypes.bool.isRequired,
      totalLikes: PropTypes.number.isRequired,
      caption: PropTypes.string.isRequired,
    }).isRequired,
  };