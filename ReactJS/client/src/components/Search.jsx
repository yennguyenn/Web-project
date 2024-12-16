import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './Search.scss'

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const handleSearch = (event) => {
        event.preventDefault()
        onSearch(keyword)
        navigate(`/product/search?keyword=${keyword}`)
    }
    
    return (
        <form className='search-box me-0' onSubmit={handleSearch}>
            <input type='text' value={keyword} placeholder='Search...' className='search-input' onChange={(event) => setKeyword(event.target.value)}/>
            <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/></button>
        </form>
    )
}

export default Search