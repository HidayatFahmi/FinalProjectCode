import { useContext, useEffect, useState } from 'react'
import logApi from '../../api/logApi'
import ExplorePost from '../explore/ExplorePost'
import Sidebar from '../sidebar/Sidebar'
import PostDetail from '../post/PostDetail'
import "./Dashboard.css"
import { GlobalContext } from '../../config/GlobalState'

export default function Dashboard() {
  const [explorePost, setExplorerPost] = useState([])
  // const [followingPost, setFollowingPost] = useState([])
  const [size, setSize] = useState(5)
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useContext(GlobalContext)
  const [selectedPost, setSelectedPost] = useState();

  function showPostDetail(post) {
    setSelectedPost(post);
    console.log(`kepencet : ${post.imageUrl}`);
  }  

  async function getExplorePost(size) {
    const explorePost = await logApi.getExplorePost(token, { params: { size: size, page: 1 } })
    const filteredExplorePost = explorePost.data.posts;

    setExplorerPost(filteredExplorePost)
    setIsLoading(false)
    return explorePost.data.totalItems
  }

  useEffect(() => {
    getExplorePost(50)
  }, [size])

  return (
    // <section id="dashboard_wrap" className="dashboard mb-sm-0">
      <div className="container-fluid dashboard_side_wrap" id="dashboard-wrap">
        <div className="row">
          <div className="col-8 dash_wrap bg-light d-block">
          
              <div className="row-12 dashSide_wrap_content">
                <Sidebar/>
              </div>

              <div className="row-12 dash_wrap_content position-fixed">
                {!selectedPost? (null):<PostDetail post={selectedPost}/>}
              </div>    
          </div>

         <div className="container-fluid col-3 bg-dark  ms-3">
          <div className="bg-light side_wrap d-block" >
            {explorePost &&
              explorePost.map((post, i)=> {
                return <span key={i} onClick={() => showPostDetail(post)}> <ExplorePost post={post}/></span>
              })}
          </div>
         </div>
        </div>
        </div>
  )
}
