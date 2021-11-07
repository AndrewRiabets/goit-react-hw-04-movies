import { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { moreMoviesFromUserQuery } from "../../Services/moviesAPI";
// import { ImSearch } from "react-icons/im";
import styles from "./MoviesView.module.css";

export default function MoviesView() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const urlQuery = new URLSearchParams(location.search).get("query");

  const handleValueChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      return alert("Enter something");
    }

    moreMoviesFromUserQuery(query).then(setMovies);
    setQuery("");
    console.log(movies);
  };

  const pushSearch = () => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  useEffect(() => {
    if (urlQuery) moreMoviesFromUserQuery(urlQuery).then(setMovies);
  }, []);

  const {
    moviesPage,
    form,
    btn,
    input,
    moviesBox,
    moviesSt,
    moviesST__item,
    moviesSt__link,
  } = styles;

  return (
    <div className={moviesPage}>
      <form className={form} onSubmit={handleSubmit}>
        <input
          className={input}
          type="text"
          autoFocus
          placeholder="Enter movie"
          value={query}
          onChange={handleValueChange}
        />
        <button className={btn} type="submit" onClick={pushSearch}>
          Search
        </button>
      </form>
      <div className={moviesBox}>
        <ul className={moviesSt}>
          {movies &&
            movies.map((movie) => (
              <li key={movie.id} className={moviesST__item}>
                <Link
                  query={urlQuery}
                  className={moviesSt__link}
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from:
                        `${history.location.pathname}` +
                        `${history.location.search}`,
                      label: "Back to movies",
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
