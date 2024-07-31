import { NavLink, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <h2 className={styles.movieTitle}>
              <NavLink
                to={`/movies/${movie.id}`}
                className={styles.movieLink}
                state={{ from: location }}
              >
                {movie.title}
              </NavLink>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
