import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { popularMoviesAPI } from "../../Services/moviesAPI";
import styles from "./HomeView.module.css";

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    popularMoviesAPI().then(setMovies);
  }, []);

  const {
    homeView,
    homeView__title,
    homeView__list,
    homeView__link,
    homeView__item,
  } = styles;

  return (
    <div>
      <h1 className={homeView__title}>TRENDING TODAY</h1>
      <ul className={homeView__list}>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id} className={homeView__item}>
              <Link
                className={homeView__link}
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location, label: "Back to popular" },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

HomeView.propTypes = {
  title: PropTypes.string,
};
