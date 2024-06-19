import './background.css'
//Algo

function Background({posters, posters2}){
    const BASE_URL_POSTER = 'https://image.tmdb.org/t/p/w500'

    return (
        <>
            <div className='posters'>
                <div className='posters-container'>
                    {
                        posters.map(poster => (
                            <img key={poster.id} src={BASE_URL_POSTER + poster} />
                        ))
                    }
                </div>
                <div className='posters-container'>
                    {
                        posters2.map(poster => (
                            <img key={poster.id} src={BASE_URL_POSTER + poster} />
                        ))
                    }
                </div>
            </div>
            <div className='gradient-bg'></div>
        </>
    )
}

export default Background