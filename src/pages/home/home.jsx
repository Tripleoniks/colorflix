import React, { useEffect, useState } from "react";
import Movielist from "../../static/movies";
import "./home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Movie from "../movie-view/movie";
import Pagination from "react-js-pagination";
import ButtonLoader from "../../components/buttonLoader/buttonLoader";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Home = () => {

  
  const [star, setStar] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("asc");
  const [view, setView] = useState("grid");
  const [highlightedId, setHighlightedId] = useState('');
  const [page, setPage] = useState(1);

  function checkView() {
    if(localStorage.movie_view) {
    setView(localStorage.movie_view)
  } else {
    setView("grid")
  }
  }
  

 

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=a756c96929925dd01ba101f450431c6a&language=en-US&page=${page}`
      );
      console.log(data);
      setMovies(data.results);
      setLoading(false);
    })();
  }, [page]);

  const highlighted = localStorage.getItem('highlighted_row')
  console.log(highlighted)

  const sorted = movies.sort((a, b) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.title.localeCompare(b.title);
  });

  const highlight = (index, id) => {
    if (star === index) {
      return setStar(null);
    }
    setStar(index);
    setHighlightedId(id)
    localStorage.setItem('highlighted_row', id)
  };

  const showMovieDetails = (id) => {
    setMovieModal(true);
    setMovieId(id);
  };

  const navPage = (pageNumber) => {
    setPage(pageNumber)
  }

  const setViews = e => {
    setView(e.target.value)
    localStorage.setItem("movie_view", view)
  }

  return (
    <div className="home">
      <div className="sort">

      <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={250}
          pageRangeDisplayed={5}
          onChange={navPage}
          innerClass="pag"
          linkClass="pag-links"
        />
      
        <div className="toggles">
        
        <div className="check">
          <label className="sort-label" htmlFor="sort">
            View
          </label>
          <select name="sort" onChange={setViews}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>
        <div>
          <label className="sort-label tmp" htmlFor="sort">
            Sorted by
          </label>
          <select name="sort" onChange={(e) => setSortType(e.target.value)}>
            <option selected value="asc">
              Ascending
            </option>
            <option value="desc">Descending</option>
          </select>
        </div>
        </div>
        
      </div>

      {loading ? <ButtonLoader /> : view === "list" && (
        <table style={{ color: "#fff", width: "100%" }} className="containerx">
          <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Rating</td>
          </tr>
          {sorted.map(
            ({ title, id, poster_path, vote_average, overview }, index) => {
              return (
                <tr
                  className={id == highlighted ? 'highlight moviexss' : 'moviexs'}
                  id={id === highlightedId ? 'highlight' : null}
                  key={id}
                >
                  <td onClick={() => showMovieDetails(id)}>
                    <div style={{ height: '50px', width: '50px', backgroundSize: "cover", backgroundImage: `url(${IMG_API + poster_path})` }} className="img" ></div>
                  </td>
                   
                  <td onClick={() => showMovieDetails(id)}>
                    <p className="titlex">{title}</p>
                  </td>

                  <td onClick={() => showMovieDetails(id)}>
                    <p className="rating">{vote_average.toFixed(1)}</p>
                  </td>
                  <td>
                    <i
                      onClick={() => highlight(index,id)}
                      id={star === index ? "selected" : null}
                      className={id == highlighted ? "fas fa-star selected" : "fas fa-star"}
                    ></i>
                  </td>
                </tr>
              );
            }
          )}
        </table>
      )}
      {loading ? <ButtonLoader /> : view === 'grid' &&
      <div className="container">
        {sorted.map(
          ({ title, id, poster_path, vote_average, overview }, index) => {
            return (
                <div onClick={() => showMovieDetails(id)} className="movie" key={id}>
                  <div
                    style={{ backgroundImage: `url(${IMG_API + poster_path})` }}
                    className="img"
                  >
                    <p className="rating">{vote_average.toFixed(1)}</p>
                  </div>
                  <div className="bottom">
                    <p className="title">{title}</p>
                    <i
                      onClick={() => highlight(index)}
                      id={star === index ? "selected" : null}
                      className="fas fa-star"
                    ></i>
                  </div>
                </div>
            );
          }
        )}
      </div>}
      {movieModal && <Movie movieId={movieId} setMovieModal={setMovieModal} />}
    </div>
  );
};

export default Home;
