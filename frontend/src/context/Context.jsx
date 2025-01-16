import { createContext, useContext, useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PropTypes from 'prop-types'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(false)
  const [dark, setDark] = useState(false)
  const [scroll, setScroll] = useState('')

  useEffect(() => {
    AOS.init({
      // Global settings:
      offset: 200, // offset (in px) from the original trigger point
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
    })

    const handlerDark = () => {
      const storedValue = localStorage.getItem('dark-mode')
      if (storedValue === 'true') {
        document.documentElement.classList.add('dark')
        setDark(true)
      } else {
        setDark(false)
      }
    }

    handlerDark()

    const handlerStickey = () => {
      if (window.scrollY > 50) {
        setScroll('bg-gray-100 dark:bg-[#222831] shadow-xl')
      } else {
        setScroll('')
      }
    }

    // Call the handlerStickey function initially and add the scroll event listener
    handlerStickey()

    const handlerWidth = () => {
      if (window.innerWidth > 768) {
        setMenu(false)
      }
    }

    handlerWidth()

    window.addEventListener('scroll', handlerStickey)
    window.addEventListener('resize', handlerWidth)

    return () => {
      window.removeEventListener('resize', handlerWidth)
      window.removeEventListener('scroll', handlerStickey)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{ menu, setMenu, dark, setDark, scroll, setScroll }}
    >
      {children}
    </AppContext.Provider>
  )
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider')
  }
  return context
}