import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import { Link } from 'react-router-dom'
import logApi from '../../api/logApi'
import "./Sidebar.css"


export default function Sidebar() {
  const { loggedUser, token } = useContext(GlobalContext)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    async function getFollowing() {
      const followingByUserId = await logApi.getFollowingByUserId(loggedUser.id, token, { params: { size: 10, page: 1 } })
      setFollowing(followingByUserId.data.users)
    }
    getFollowing()
  }, [])

  return (
    <section id="sidebar" className="sidebar">
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="sidebar__wrap d-flex flex-column ">
            <div className="sidebar__wrap_content">
              <hr className="text-primary d-none d-sm-block" />
              <ul className="sidebar__wrap_content-list nav nav-pills flex-column mt-2 mt-sm-0 scrollable-list" id="menu">
                {following &&
                  following.map((following, i) => {
                    return (
                      <li key={i} className="nav-item my-sm-1 ">
                        <Link to={`/u/${following.id}`} className="nav-link text-dark text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                          <div className='me-xl-3 me-xxl-4'>
                            <div><img src={following.profilePictureUrl} alt="" /></div>
                            <div>{following.username}</div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
