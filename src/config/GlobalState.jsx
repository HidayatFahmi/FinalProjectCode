import { createContext, useEffect, useState } from 'react'
import PropTypes from "prop-types"

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    }
  }, [])

  const GlobalState = { isLogin, setIsLogin, loggedUser, setLoggedUser, token }
  return <GlobalContext.Provider value={GlobalState}>{children}</GlobalContext.Provider>
}


GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };