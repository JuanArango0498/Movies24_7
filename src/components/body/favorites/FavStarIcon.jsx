import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './favstaricon.css';

function FavStarIcon({ user, movieId, onFavorite }) {
    if (!user) {
        return null;
    }

    const handleFavoriteClick = () => {
        onFavorite(movieId);
    };

    return (
        <button className="star-icon" onClick={handleFavoriteClick}>
            <FontAwesomeIcon icon="star" />
        </button>
    );
}

export default FavStarIcon;

