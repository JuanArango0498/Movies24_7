import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './movie_details.css'

function MovieDetails() {
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '?api_key=9a3146d8e7bf4ecb5674eadcc343a3fc';
    const BASE_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
    const [movie, setMovie] = useState({});
    const movie_id = useParams().movie_id
    let colorRate = (movie.vote_average >= 5) ? 'green' : 'red';
    const genres = movie.genres

    useEffect(() => {
        fetch(BASE_URL + movie_id + API_KEY)
            .then(res => res.json())
            .then(json => setMovie(json));
    }, [movie_id]);

    console.log(genres)

    return (
        <>
            <div className="details-background">
                <div className="details-area">
                </div>
                <div className="backdrop-container">
                    <div className="backdrop-gradient"></div>
                    <img src={BASE_URL_POSTER + movie.backdrop_path} alt={movie.title} />
                </div>
            </div>
            <div className="details-container">
                <h1>
                    {movie.title}
                    <h5 style={{ color: colorRate, margin: 0 }}><FontAwesomeIcon icon="fa-solid fa-ranking-star" />  {movie.vote_average}</h5>
                </h1>
                <div className="img-poster">
                    <img src={BASE_URL_POSTER + movie.poster_path} alt={movie.title} />
                </div>
                <p>{movie.overview}</p>
                <div className="genres">
                    {
                        genres &&
                        
                        genres.map(genre => <h5>{genre.name}</h5>)
                    }
                </div>
            </div>
        </>
    )
}

export default MovieDetails