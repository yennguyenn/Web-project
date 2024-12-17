import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
    isAuthenticated: { token: null, user: null },
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({
        token: null,
        user: null,
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (token && user) {
            try {
                const parsedUser = JSON.parse(user)

                const expiryTime = JSON.parse(atob(token.split('.')[1])).exp * 1000
                if (expiryTime > Date.now()) {
                    setIsAuthenticated({ token, user: parsedUser })
                } else {
                    logout()
                    alert('Token has expired, please login again')
                }
            } catch (error) {
                console.error('Failed to parse user from localStorage', error)
                setIsAuthenticated({ token: null, user: null })
            }
        }
    }, [])

    const login = (token, user) => {
        setIsAuthenticated({ token, user })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        // if (user.Role === 'admin') {
        //     window.location.href = '/admin'
        // } else {
            window.location.href = '/home'
        // }
    }

    const logout = () => {
        setIsAuthenticated({ token: null, user: null })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }

