import { useParams } from 'react-router-dom'
import "./Profile.css"
import { useContext, useEffect, useState } from 'react'
import logApi from '../../api/logApi'
import { GlobalContext } from '../../config/GlobalState'
import getLoggedUser from '../../config/getLoggedUser'
// import FollowModal from '../modal/FollowModal'
// import PostModal from '../modal/PostModal'
// import getLoggedUser from '../../config/getLoggedUser'

export default function Profile() {
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const { loggedUser } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userById, setUserById] = useState([])
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(id))

  async function followUser(e) {
    e.preventDefault()

    const data = {
      userIdFollow: id,
    }
    const responseFollow = await logApi.followUser(data, token)
    console.log(responseFollow)

    getLoggedUser()
    setIsFollow(true)
  }

  async function unfollowUser(e) {
    e.preventDefault()

    const responseUnfollow = await logApi.unfollowUser(id, token)
    console.log(responseUnfollow)

    getLoggedUser()
    setIsFollow(false)
  }

  useEffect(() => {
    async function getUserById(id) {
      const userById = await logApi.getUserById(id, token)
      const followingByUserId = await logApi.getFollowingByUserId(id, token, { params: { size: 15, page: 1 } })
      const followersByUserId = await logApi.getFollowersByUserId(id, token, { params: { size: 15, page: 1 } })

      userById.data.following = followingByUserId.data.users
      userById.data.followers = followersByUserId.data.users

      const userPosts = await logApi.getPostByUserId(id, token, { params: { size: 20, page: 1 } })
      userById.data.totalPosts = userPosts.data.totalItems
      userById.data.posts = userPosts.data.posts

      function sortByDate(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }

      userById.data.posts.sort(sortByDate)

      setUserById(userById.data)
      setIsLoading(false)
    }
    getUserById(id)
  }, [id])

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary m-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <section id="profile" className="profile min-vh-100 bg-light">
          {/* Profile Header */}
          <div className="profile__header my-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-3 profile__header-image ms-5">
                  <img src={userById.profilePictureUrl} alt="" />
                </div>
                <div className="col-8 profile__header-caption">
                  <div className="profile__header-caption-1">
                    <span className='fs-3'>{userById.username}</span>
                    {userById.id !== loggedUser.id ? (
                      !isFollow ? (
                        <>
                          <button className="bt1 ms-4 button-solid" onClick={followUser}>
                            Follow
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="bt2 ms-4 button-empty" onClick={unfollowUser}>
                            Unfollow
                          </button>
                        </>
                      )
                    ) : null}
                  </div>
                  <div className="profile__header-caption-2 d-flex gap-3 mt-3 gap-sm-5">
                    <span className="text-center">
                      <span className="fw-bold">{userById.totalPosts}</span> posts
                    </span>
                    <span className="text-center cursor" data-bs-toggle="modal" data-bs-target="#followersModal">
                      <span className="fw-bold">{userById.totalFollowers}</span> followers
                    </span>
                    <span className="text-center cursor" data-bs-toggle="modal" data-bs-target="#followingModal">
                      <span className="fw-bold">{userById.totalFollowing}</span> following
                    </span>
                  </div>
                  <div className="profile__header-caption-3 mt-3 d-none d-sm-block">
                    {userById.name && <p className="fw-bold">{userById.name}</p>}
                    {userById.bio && <p>{userById.bio}</p>}
                    {userById.website && (
                      <a href={userById.website} target="_blank">
                        {userById.website}
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-12 profile__header-mobile d-block d-sm-none mt-2">
                  {/* {userById.name && <p className="fw-bold m-0">{userById.name}</p>}
                  {userById.bio && <p className="m-0">{userById.bio}</p>}
                  {userById.website && (
                    <a href={userById.website} target="_blank">
                      {userById.website}
                    </a>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Posts */}
          <div className="profile__posts">
            <div className="container">
              <div className="row row-cols-3">
                {userById.posts &&
                  userById.posts.map((post, i) => {
                    return (
                      <div key={i} className="col profile__posts-post mb-4">
                        <img src={post.imageUrl} alt="" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`} />
                        {/* <PostModal post={post} /> */}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          {/* <FollowModal user={userById} /> */}
        </section>
      )}
    </>
  )
}
