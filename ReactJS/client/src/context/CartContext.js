import React, { createContext, useEffect, useState } from 'react'
import { handleGetTotalQuantity } from '../services/cartService'

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cartQuantity, setCartQuantity] = useState(0)
    const [isCartUpdated, setIsCartUpdated] = useState(false)

    const getTotalQuantity = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await handleGetTotalQuantity(token)
                const numberQuantity = response.getTotalQuantity
                if (numberQuantity === 0) {
                    setCartQuantity(0)
                } else if (numberQuantity > 99) {
                    setCartQuantity('99+')
                } else {
                    setCartQuantity(numberQuantity)
                }
            }
        } catch (error) {
            console.error('Error in get total quantity:', error)
        }
    }

    useEffect(() => {
        getTotalQuantity()
    }, [isCartUpdated])

    const updateCartQuantity = () => {
        setIsCartUpdated(prev => !prev)
      }

    return (
        <CartContext.Provider value={{ cartQuantity, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
