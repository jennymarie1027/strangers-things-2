import React from 'react'
import {Link} from 'react-router-dom'

const Nav =  ({ search, setSearch}) => {

    return (
    <nav>
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="search">Search Posts</label>
            <input 
                id='search'
                type='text'
                placeholder='search posts'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </form>
    </nav>
    )
}

export default Nav
