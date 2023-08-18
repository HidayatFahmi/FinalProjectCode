import { createContext, useEffect, useState } from 'react'
import PropTypes from "prop-types"
// import getLoggedUser from './getLoggedUser'

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
  const [theme, setTheme] = useState('dark')
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    }
  }, [])

  const GlobalState = { isLogin, setIsLogin, loggedUser, setLoggedUser, theme, setTheme, token }
  return <GlobalContext.Provider value={GlobalState}>{children}</GlobalContext.Provider>
}


GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };