import logApi from "../api/logApi"

export default async function getLoggedUser(token) {
  // * API Get Logged User
  const loggedUser = await logApi.getLoggedUser(token)

  // * API Get Followers and Following by User ID
  const followingByUserId = await logApi.getFollowingByUserId(loggedUser.data.id, token, { params: { size: 10, page: 1 } })
  const followersByUserId = await logApi.getFollowersByUserId(loggedUser.data.id, token, { params: { size: 10, page: 1 } })

  loggedUser.data.following = followingByUserId.data.users
  loggedUser.data.followers = followersByUserId.data.users
  loggedUser.data.followingId = followingByUserId.data.users.map((user) => user.id)

  localStorage.setItem('loggedUser', JSON.stringify(loggedUser.data))

  return loggedUser.data
}