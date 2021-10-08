import { Link } from 'react-router-dom';

const Header = ({ token }) => {
    return (
        <header className='navbar navbar-expand-sm navbar-light bg-light fixed-top'>
            <Link to='/' className='navbar-brand mb-0 h1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0275d8" className="bi bi-house" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg> 
            </Link>
            <button 
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                className='navbar-toggler'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <Link to='/'>Home</Link>
                <Link to='/postforum' className='nav-link' >Post Forum</Link>
            {!token ? ( 
                <Link to='/login'> Login </Link>
            ) : ( 
            <>
                
                <Link to='/profile' className='nav-link'>Profile</Link>
                <Link to='/newpost' className='nav-link'>New Post</Link>
                <Link to='/logout' className='nav-link'>Logout</Link>
             </> 
             )}
            </div>
        </header>
    )
}

export default Header
