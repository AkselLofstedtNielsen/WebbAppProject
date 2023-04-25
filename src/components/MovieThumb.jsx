import React from "react";
import { useState, useEffect } from "react";
import '.././App.css'


const MovieThumb = ({movie}) => {
    return (
        <div className='movie'>
            <div>
                <p>Click for more info</p>
            </div>
            <div>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`} alt='Movie title'/>
            </div>
            <div>
                <h3>{movie.title}</h3>
                <span>{movie.release_date}</span>
            </div>
        </div>
    )
}

export default MovieThumb;