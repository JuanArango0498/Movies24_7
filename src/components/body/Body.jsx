// src/components/body/Body.jsx
import Header from '../header/Header.jsx';
import Background from '../background/Background.jsx';
import MovieCard from './MovieCard.jsx';
import { useState, useEffect } from 'react';
import './body.css';

function Body() {
    const [movie, setMovie] = useState([]);
    const [anotherMovie, setAnotherMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [user, setUser] = useState(null);

    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?';
    const API_KEY = 'api_key=9a3146d8e7bf4ecb5674eadcc343a3fc';
    const showBy = '&sort_by=popularity.desc';

    useEffect(() => {
        fetch(BASE_URL + API_KEY + showBy + '&page=' + page)
            .then(res => res.json())
            .then(json => setMovie(json.results));
    }, [page]);

    useEffect(() => {
        fetch(BASE_URL + API_KEY + '&sort_by=revenue.desc' + '&page=' + page)
            .then(res => res.json())
            .then(json => setAnotherMovie(json.results));
    }, [page]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleFavorite = async (movieId) => {
        if (!user) return;

        try {
            const response = await fetch('http://localhost:5000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, movieId }),
            });
            const result = await response.json();

            if (result.success) {
                alert('Película añadida a favoritos');
                // Actualizar la información del usuario si es necesario
            } else {
                alert('Error al añadir a favoritos: ' + result.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al añadir a favoritos. Intenta nuevamente.');
        }
    };

    function next() {
        setPage(page + 1);
    }

    function back() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <>
            <Background posters={movie.map(pelicula => pelicula.poster_path)} posters2={anotherMovie.map(otraPelicula => otraPelicula.poster_path)} />
            <div className='general'>
                <Header />
                <div className='movies-container'>
                    <div className='pages-dir'>
                        <button className='back' onClick={back}>Back</button>
                        <button className='next' onClick={next}>Next</button>
                    </div>
                    <h3>Page N° {page}</h3>
                    <div className='list-movies'>
                        {movie.map(pelicula => (
                            <MovieCard key={pelicula.id} pelicula={pelicula} user={user} onFavorite={handleFavorite} />
                        ))}
                    </div>
                    <div className='pages-dir'>
                        <button className='back' onClick={back}>Back</button>
                        <button className='next' onClick={next}>Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;