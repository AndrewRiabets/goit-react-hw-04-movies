import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Container from "./Components/Container/Container";
// import "./App.css";

const HomeView = lazy(() =>
  import("./Components/HomeView/HomeView" /* webpackChunkName: "HomeView" */)
);
const MoviesView = lazy(() =>
  import(
    "./Components/MoviesView/MoviesView" /* webpackChunkName: "MoviesView" */
  )
);
const MovieDetailsView = lazy(() =>
  import(
    "./Components/MovieDetailsView/MovieDetailsView" /* webpackChunkName: "MovieDetailsView" */
  )
);
const NotFoundView = lazy(() =>
  import("./Views/NotFoundView" /* webpackChunkName: "NotFoundView" */)
);

export default function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
