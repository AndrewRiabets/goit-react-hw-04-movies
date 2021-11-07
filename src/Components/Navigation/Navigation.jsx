import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const { navigation, nav__link, nav__activeLink } = styles;

  return (
    <nav className={navigation}>
      <NavLink
        exact
        to="/"
        className={nav__link}
        activeClassName={nav__activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={nav__link}
        activeClassName={nav__activeLink}
      >
        Movies
      </NavLink>
    </nav>
  );
}
