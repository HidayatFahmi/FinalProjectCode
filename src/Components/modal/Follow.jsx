import { useContext, useState } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import logApi from '../../api/logApi'
import getLoggedUser from '../../config/getLoggedUser'
import PropTypes from 'prop-types';
import "./Follow.css"

export default function Follow({ user }) {
  const { loggedUser, token } = useContext(GlobalContext)
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(user.id))

  async function followUser(e) {
    e.preventDefault()
    const data = {
      userIdFollow: user.id,
    }
    const responseFollow = await logApi.followUser(data, token)
    console.log(responseFollow)

    getLoggedUser(token)
    setIsFollow(true)
  }

  async function unfollowUser(e) {
    e.preventDefault()

    const responseUnfollow = await logApi.unfollowUser(user.id, token)
    console.log(responseUnfollow)

    getLoggedUser(token)
    setIsFollow(false)
  }

  return (
    <section id="follows" className="follows">
      <div className="follow">
        <a href={`/u/${user.id}`} className="text-decoration-none">
          <div>
            <img src={user.profilePictureUrl} alt="" />
            <span>{user.username}</span>
          </div>
        </a>
        <span className='button-follow'>
        {user.id !== loggedUser.id ? (
          !isFollow ? (
            <>
              <button className="ms-4 bg-primary rounded" onClick={followUser}>
                Follow
              </button>
            </>
          ) : (
            <>
              <button className="ms-4y bg-warning rounded" onClick={unfollowUser}>
                Unfollow
              </button>
            </>
          )
        ) : (
          <a href={`/u/${loggedUser.id}`}>
            <button className="ms-4 button-solid rounded">My Profile</button>
          </a>
        )}
        </span>
      </div>
    </section>
  )
}


Follow.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  };