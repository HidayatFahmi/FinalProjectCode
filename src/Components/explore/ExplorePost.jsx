import { Link } from 'react-router-dom'
import "./ExplorePost.css"
import { useContext, useEffect, useState } from 'react'
import logApi from '../../api/logApi'
import { GlobalContext } from '../../config/GlobalState'
import PropTypes from 'prop-types'

export default function ExplorePost({post}) {
  const [isLike, setIsLike] = useState(post.isLike)
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
      <div className="h-100 border-5 border-dark border-bottom py-3 timelinePost__content timelinePost__hidden mb-5">

        <div className="sidePost__content-image d-flex justify-content-center">
          <img src={post.imageUrl} alt="" className="pt-3" onDoubleClick={(e) => doubleClickToLike(e, post.id)} />
          <i className={`bx bxs-heart heart-icon-${post.id}`}></i>
        </div>

        <div className="timelinePost__content-icons ms-3">
          <div className="timelinePost__content-icons-left">
            {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
          </div>
          <div className="timelinePost__content-icons-right">
            {post.user?.id === loggedUser.id ? (
              <>
                <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${post.id}`}></i>
                {/* <i className="bx bx-trash" onClick={deletePost}></i> */}
              </>
            ) : null}
          </div>
        </div>
        <div className="timelinePost__content-likes ms-3">
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
            {/* <span className="fw-light"> - {post.createdAt !== post.updatedAt ? 'Edited · ' : ''}{setTime(post.createdAt)}</span> */}
          </p>
        </div>
        <div className="timelinePost__content-caption ms-3">
          <Link to={`/u/${post.user?.id}`} className="fw-bold text-decoration-none text-black">
            {post.user?.username}
          </Link>{' '}
          {post.caption}

        </div>
      </div>
    </section>
  )
}


ExplorePost.propTypes = {
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