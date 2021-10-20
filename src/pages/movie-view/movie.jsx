import React, { useEffect, useState } from "react";
import "./movie.scss";
import axios from "axios";
import ButtonLoader from "../../components/buttonLoader/buttonLoader";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ movieId, setMovieModal }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=a756c96929925dd01ba101f450431c6a&language=en-US`
      );
      console.log(data);
      setMovie(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="moviex">
        <div className="wrapper">
          <div className="modal">
            <i
              onClick={() => setMovieModal(false)}
              className="fas fa-times"
            ></i>
            {loading ? <ButtonLoader /> : 
            <>
            <div className="top">
              <div
                style={{
                  backgroundImage: `url(${IMG_API + movie.backdrop_path})`,
                }}
                className="left"
              ></div>
              <div className="right">
                <p className="m-title">{movie.title}</p>
                <p className="m-rating">Rating:   {movie.vote_average}</p>
                <p className="date">Release Date:   {movie.release_date}</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  className="listing"
                >Go to movie listing</a>
              </div>
            </div>
            <div className="bottom">
              <p className="head">Overview</p>
              <p className="para">{movie.overview}</p>
            </div>
            </>}
          </div>
        </div>
    </div>
  );
};

export default Movie;
