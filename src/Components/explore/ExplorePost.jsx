import { Link } from 'react-router-dom'
import "./ExplorePost.css"
import logApi from '../../api/logApi'
import { useEffect,useState, useContext} from 'react'
import { GlobalContext } from '../../config/GlobalState'
import PropTypes from 'prop-types'


export default function ExplorePost({post}) {
  const [isLike, setIsLike] = useState(post.isLike);
  const { token } = useContext(GlobalContext);

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

       <Link to={`/u/${post.user?.id}`} className="fw-bold text-decoration-none text-black fs-7">
        <div className='explore-profile ms-3'>
            <img src={post.user?.profilePictureUrl} alt="yuhu" />
            <span className='ms-2 fw-bold'>{post.user?.username}</span>
          </div>
        </Link>{' '}

        <div className="sidePost__content-image d-flex justify-content-center mb-3">
          <img src={post.imageUrl} alt="" className="pt-3" />
        </div>

        <div className="explore-like-comment ms-4 d-block d-xl-none">
          <div className="fs-2">
            {isLike ? <i className="bx bxs-heart me-3 text-danger" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart me-3" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
            <i className="bx bx-message-rounded me-3" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`}></i>
            <i className="bx bx-share-alt" data-tooltip-id="tooltip-share" data-tooltip-content="Coming Soon!"></i>
          </div>
        </div>

        <div className="explore-like-count ms-4 d-block d-xl-none">
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

        <div className="timelinePost__content-caption ms-3">
          <span className='fw-bold'>{post.user?.username}</span>
          <span className='ms-3'>{post.caption}</span>
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