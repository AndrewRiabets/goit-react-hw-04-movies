import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  Route,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import { moreInfoAPI } from "../../Services/moviesAPI";
import styles from "./MoviesDetailsView.module.css";

const Cast = lazy(() => import("../Cast/Cast" /*webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /*webpackChunkName: "Review" */)
);

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    moreInfoAPI(movieId).then(setMovie);
  }, [movieId]);

  const pushSearch = () => {
    history.push({
      ...location,
      search: `query=1`,
    });
  };

  const onBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  const {
    movieSt,
    movieST__btn,
    movieSt__title,
    movieSt__score,
    movieSt__overviewTitle,
    movieSt__overviewText,
    movieSt__poster,
    movieSt__descr1,
    movieSt__descr2,
    movieSt__genresTitle,
    movieSt__genresList,
    movieSt__genresItem,
    movieSt__aditional,
    movieSt__aditionalList,
    movieSt__aditionalLink,
    movieSt__activeLink,
    item,
  } = styles;
  return (
    <div>
      {movie && (
        <div className={movieSt}>
          <button type="button" className={movieST__btn} onClick={onBack}>
            {/* <AiOutlineArrowLeft style={{ marginRight: 8 }} /> */}
            {location?.state?.label ?? "Go back"}
          </button>
          <div className={movieSt__descr1}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.orginal_title}
              className={movieSt__poster}
            />
            <div className={movieSt__descr2}>
              <h1 className={movieSt__title}>{movie.title || movie.name}</h1>
              <p className={movieSt__score}>User score {movie.vote_average}</p>
              <h2 className={movieSt__overviewTitle}>Overview</h2>
              <p className={movieSt__overviewText}>{movie.overview}</p>

              <h3 className={movieSt__genresTitle}>Genres</h3>
              <ul className={movieSt__genresList}>
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <li key={genre.id} className={movieSt__genresItem}>
                      {genre.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={movieSt__aditional}>
            <ul className={movieSt__aditionalList}>
              <li className={item}>
                <NavLink
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                    state: {
                      from: history.location.state.from,
                      label: "Back to movies from cast",
                    },
                  }}
                  onClick={pushSearch}
                  className={movieSt__aditionalLink}
                  activeClassName={movieSt__activeLink}
                >
                  Cast
                </NavLink>
              </li>
              <li className={item}>
                <NavLink
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                    state: {
                      from: history.location.state.from,
                      label: "Back to movies from reviews",
                    },
                  }}
                  className={movieSt__aditionalLink}
                  activeClassName={movieSt__activeLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Suspense fallback="Loading...">
        <Route path="/movies/:moviesId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:moviesId/reviews">
          <Reviews />
        </Route>
      </Suspense>
    </div>
  );
}
