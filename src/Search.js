export default  ({ search, setSearch}) => {

    return (
        <form>
            <label htmlFor="search">Search Posts</label>
            <input 
                id='search'
                type='text'
                placeholder='search posts'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='form-control'
                style={{maxWidth: 75 + 'vw', height: 7 + 'vh'}}
            />
        </form>
    )
}

