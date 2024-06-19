// src/components/favoritespage/Favorites.jsx
import { useEffect, useState } from 'react';
import MovieCard from "../body/MovieCard";
import './favorites.css';

function Favorites() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [user, setUser] = useState(null);

    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '?api_key=9a3146d8e7bf4ecb5674eadcc343a3fc';

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);

            // Fetch favorite movies
            if (user.favorites && user.favorites.length > 0) {
                const fetchFavorites = async () => {
                    const moviePromises = user.favorites.map(id => 
                        fetch(BASE_URL + id + API_KEY).then(res => res.json())
                    );
                    const movies = await Promise.all(moviePromises);
                    console.log(movies)
                    setFavoriteMovies(movies);
                };
                fetchFavorites();
            }
        }
    }, []);

    return (
        <>
            <div className="fav-bg"></div>
            <div className='favorites'>
                <h1>Favorites: {user ? user.nombre : 'User'}</h1>
                <div className='list-movies'>
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map(movie => (
                            <MovieCard key={movie.id} pelicula={movie} user={user} />
                        ))
                    ) : (
                        <div className='message'>
                            <p><b>There's no favorite content here</b></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Favorites;