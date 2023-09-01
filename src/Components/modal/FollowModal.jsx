import Follow from './Follow';
import "./FollowModal.css"
import PropTypes from 'prop-types';

export default function FollowModal({ user }) {
  return (
    <>
      {/* Followers Modal */}
      <div className="modal fade followModal" id={`followersModal`} tabIndex={-1} aria-labelledby="followersModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content bg-white">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Followers</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.followers &&
                (user.followers.length !== 0 ? (
                  user.followers.map((follower, i) => {
                    return <Follow key={i} user={follower} />
                  })
                ) : (
                  <>No Follower</>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Following Modal */}
      <div className="modal fade followModal" id={`followingModal`} tabIndex={-1} aria-labelledby="followingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content bg-white">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Following</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.following &&
                (user?.following.length !== 0 ? (
                  user.following.map((following, i) => {
                    return <Follow key={i} user={following} />
                  })
                ) : (
                  <>No Following</>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


FollowModal.propTypes = {
    user: PropTypes.shape({
      followers: PropTypes.arrayOf(PropTypes.string),
      following: PropTypes.arrayOf(PropTypes.string),
      // Add other required user prop types here
    }),
  };