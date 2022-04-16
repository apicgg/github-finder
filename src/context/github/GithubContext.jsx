import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Search users with github api
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Get single user with github api
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/user?${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USERS',
        payload: data,
      })
    }
  }

  // ! Clear search results
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    })
  }

  // Get user from api (for testing only)
  // Add useEffect in UserResults.jsx t o display it
  // const fetchUsers = async () => {
  //   setLoading()

  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   })

  //   const data = await response.json()

  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   })
  // }

  // Set loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
