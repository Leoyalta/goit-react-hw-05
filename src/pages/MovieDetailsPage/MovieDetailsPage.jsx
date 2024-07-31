import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMoviesId } from "../../movies-API";
import Loader from "../../components/Loader/Loaader";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLocationRef = useRef(location.state?.from ?? "/");
  console.log(backLocationRef.current);

  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        setError(false);
        const data = await getMoviesId(moviesId);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [moviesId]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={styles.details}>
      {isLoading && <Loader />}
      {error && <p className={styles.error}>Error loading movie details.</p>}

      {movie && (
        <div>
          <Link to={backLocationRef.current} className={styles.goBack}>
            Go Back
          </Link>
          <div className={styles.container}>
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className={styles.imgMovie}
            />
            <div className={styles.textWrapper}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.rating}>Rating: {movie.vote_average}</p>
              <p className={styles.overview}>
                <b>Overview:</b> {movie.overview}
              </p>
              <p className={styles.genres}>
                <b>Genres:</b>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
          <ul className={styles.navList}>
            <li>
              <NavLink to="credits" className={styles.navLink}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={styles.navLink}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
