import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import logoMovies from './logoMovies24_7.png';
import MovieCard from '../body/MovieCard';

function Header() {
    const [keyWord, setKeyWord] = useState('');
    const [search, setSearch] = useState([]);
    const [user, setUser] = useState(null);

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
    const API_KEY = 'api_key=9a3146d8e7bf4ecb5674eadcc343a3fc';

    useEffect(() => {
        fetch(BASE_URL + API_KEY + '&query=' + keyWord)
            .then(res => res.json())
            .then(json => setSearch(json.results));
    }, [keyWord]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <>
            <div className='header-elements'>
                <div className='logo-container'>
                    <img src={logoMovies} alt='logo' />
                </div>
                <div className='search-bar-container'>
                    <form>
                        <input onChange={(e) => setKeyWord(e.target.value)} />
                        <button type='submit'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </form>
                </div>
                <div className='logging-container'>
                    {user ? (
                        <div className='user-info'>
                            <span>Welcome! {user.nombre}</span>
                            <button type='button' onClick={handleLogout}>
                                <FontAwesomeIcon icon="sign-out-alt" className='icon' />Log Out
                            </button>
                            <Link type='button' to='/favorites'><FontAwesomeIcon icon="star" />Favorites</Link>
                        </div>
                    ) : (
                        <div className='logging-buttons'>
                            <Link type='button' to='/sign_up'>
                                <FontAwesomeIcon icon="user" className='icon' />Sign Up
                            </Link>
                            <Link type='button' to='/sign_in'>
                                <FontAwesomeIcon icon="sign-in-alt" className='icon' />Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className='movies-container'>
                {search.length > 0 &&
                    <>
                        <h3>Search Area:</h3>
                        <div className='list-movies'>
                            {search.map(searching => <MovieCard key={searching.id} pelicula={searching} user={user} />)}
                        </div>
                        <hr />
                    </>
                }
            </div>
        </>
    );
}

export default Header;