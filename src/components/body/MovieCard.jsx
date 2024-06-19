import { useState, useEffect } from 'react';
import FavStarIcon from './favorites/FavStarIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './movie_card.css';
import { Link } from 'react-router-dom';

function MovieCard({ pelicula, user, onFavorite }) {
    const BASE_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
    let colorRate = (pelicula.vote_average >= 5) ? 'green' : 'red';

    return (
        <div className='card-main'>
            <Link className='card-poster' to={`/movie_details/${pelicula.id}`}>
                <img src={BASE_URL_POSTER + pelicula.poster_path} alt={pelicula.title} />
                <FavStarIcon user={user} movieId={pelicula.id} onFavorite={onFavorite} />
                <h2 className='movie-title'>
                    {pelicula.title}
                    <h5 style={{ color: colorRate }}><FontAwesomeIcon icon="fa-solid fa-ranking-star" />  {pelicula.vote_average}</h5>
                </h2>
            </Link>
        </div>
    );
}

export default MovieCard;