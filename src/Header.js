import { Link } from 'react-router-dom';

const Header = ({ token }) => {
    return (
        <header>
            {!token ? ( <>
                <Link to='/login'> Login </Link>
                <Link to='/register'> Register </Link>
            </> ): ( <>
                <Link to='/'>Homepage</Link>
                <Link to='/postforum'>Post Forum</Link>
                <Link to='/newpost'>New Post</Link>
                <Link to='/logout'>Logout</Link>
             </> ) }
        </header>
    )
}

export default Header
