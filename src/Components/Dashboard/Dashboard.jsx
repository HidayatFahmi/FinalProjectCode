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
  const [size] = useState(5)
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

  
    useEffect(() => {
      function setBgColor() {
        const container = document.querySelector('.side_wrap');
  
        if (window.matchMedia('(max-width: 576px)').matches) {
          container.classList.remove('bg-dark');
          container.classList.add('bg-light');
        } else {
          container.classList.remove('bg-light');
          container.classList.add('bg-dark');
        }
      }
  
      setBgColor();
      window.addEventListener('resize', setBgColor);
  
      return () => {
        window.removeEventListener('resize', setBgColor);
      };
    }, []);
  
  

  return (
      <div className="container-fluid dashboard_side_wrap" id="dashboard-wrap">
        <div className="row">
        {isLoading ? 
        (
            <>
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary m-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
        ):
          <div className="col-xl-8 dash_wrap bg-light d-block">
              <div className="row dashSide_wrap_content d-none d-xl-block">
                <Sidebar/>
              </div>

              <div className="row dash_wrap_content d-flex justify-content-center d-none d-xl-inline">
                {!selectedPost? 
                <div>
                {explorePost && explorePost.length > 0 && (
                  <span key={0}><PostDetail post={explorePost[0]} /></span>
                )}
              </div>
                :<PostDetail post={selectedPost}/>}
              </div>    
          </div>
        }

         <div className="container-fluid col-12 col-sm-10 col-xl-3 bg-dark ms-0 ms-sm-3 side_wrap position-relative">
          <div className="bg-light d-block" >
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
