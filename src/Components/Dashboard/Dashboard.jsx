import { useContext, useEffect, useState } from 'react'
import logApi from '../../api/logApi'
import ExplorePost from '../explore/ExplorePost'
import Sidebar from '../../sidebar/Sidebar'
import PostDetail from '../post/PostDetail'
import "./Dashboard.css"
import { GlobalContext } from '../../config/GlobalState'

export default function Dashboard() {
  const [explorePost, setExplorerPost] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const [size, setSize] = useState(5)
  const [loadMore, setLoadMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useContext(GlobalContext)

  // ! Blocked User
  // const blockedUser = ['a54c59e7-a1b6-4ac4-ae7b-9885a98ed869', '5b7a6783-2071-4e9f-9b8e-8e7fc4a981d4'];

  async function getExplorePost(size) {
    const explorePost = await logApi.getExplorePost(token, { params: { size: size, page: 1 } })
    // const filteredExplorePost = explorePost.data.posts.filter((post) => !blockedUser.includes(post.userId))
    const filteredExplorePost = explorePost.data.posts;

    setExplorerPost(filteredExplorePost)
    setIsLoading(false)
    return explorePost.data.totalItems
  }

  async function getFollowingPost(size) {
    const followingPost = await logApi.getFollowingPost(token, { params: { size: size, page: 1 } })
    setFollowingPost(followingPost.data.posts)
    setIsLoading(false)
    return followingPost.data.totalItems
  }

  async function loadMoreData() {
    const followingPostSize = await getFollowingPost(size)
    let x = size
    if (size < followingPostSize) {
      setSize((prev) => (prev += 10))
      x += 10
    }
    if (x >= followingPostSize) setLoadMore(false)
  }

  useEffect(() => {
    getExplorePost(50)
    getFollowingPost(size)
  }, [size])

  return (
    // <section id="dashboard_wrap" className="dashboard mb-sm-0">
      <div className="container-fluid dashboard_side_wrap" id="dashboard-wrap">
        <div className="row">
          <div className="col-8 dash_wrap bg-light d-block">
          
              <div className="row-12 dashSide_wrap_content">
                <Sidebar/>
              </div>

              <div className="row-12 dash_wrap_content">
                {isLoading?(
                <>
                  <div className='d-flex'>
                      <span>Isloading</span>
                  </div>
                </>
              ):(
                <>
                <div className="dashboard_content ">
                  <div className="explore_content">
                    {explorePost &&
                      explorePost.map((post,i) => {
                      return <PostDetail key={i} post = {post}/>
                      })}
                    </div>
                    <div className="following_content">
                      {/* {followingPost &&
                      followingPost.map((post, i) => {
                        return <PostDetail key={i} post = {post}/>
                      })} */}
                    </div>
                </div>
                {loadMore?(
                  <div className='dashboard_loadmore d-flex' onClick={()=>loadMoreData()}>
                    <span>Load more ....</span>
                  </div>
                ) : null}
                </>
              )}
              </div>    
          </div>

         <div className="container-fluid col-3 bg-light ms-3">
          <div className="bg-light side_wrap d-block">
            {explorePost &&
              explorePost.map((post, i)=> {
              return <ExplorePost key={i} post={post}/>
              })}
          </div>
         </div>
        </div>
        </div>
  )
}
