import { createContext, useState } from 'react';

export const UserContext = createContext({
  loggedUser: {
    username: '',
    email: '',
    imageUrl: ''
  },
  loggedIn: false,
  activePage: null,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
  setActivePage: () => {}
})

const UserProvider = ({ children }) => {
  const setLoggedUser = (data) => {
    setState(prevState => (
      {
        ...prevState,
        loggedUser: data
      }
    ))
  }

  const setLoggedIn = () => {
    setState(prevState => (
      {
        ...prevState,
        loggedIn: !prevState.loggedIn
      }
    ))
  }

  const setActivePage = (page) => {
    setState(prevState => (
      {
        ...prevState,
        activePage: page
      }
    ))
  }

  const initialState = {
    loggedUser: {
      username: '',
      email: '',
      imageUrl: ''
    },
    loggedIn: false,
    activePage: null,
    setLoggedUser,
    setLoggedIn,
    setActivePage
  }

  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;