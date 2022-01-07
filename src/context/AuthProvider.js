import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
   const history = useHistory()
   const [profile, setProfile] = useState({})

   useEffect(() => {
      let profile = JSON.parse(localStorage.getItem('profile'))
      if (!profile) {
         history.push('/login')
         return
      }
      else {
         setProfile(profile)
      }
   }, [history])
   return (
      <AuthContext.Provider value={{ profile }} >
         {children}
      </AuthContext.Provider>
   )
}
export default AuthProvider