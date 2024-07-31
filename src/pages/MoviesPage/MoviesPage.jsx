import { Link, useLocation, useSearchParams } from "react-router-dom";
import FilmSearch from "../../components/SearchMovie/SearchMovie";
import { useEffect, useState } from "react";
import { getSearch } from "../../movies-API";
import Loader from "../../components/Loader/Loaader";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noMovies, setNoMovies] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const location = useLocation();

  const handleSearchSubmit = (value) => {
    setSearchParams({ query: value });
    setHasSearched(true);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get("query") ?? "";
      if (!query) {
        setMovies([]);
        setNoMovies(false);
        return;
      }
      setIsLoading(true);
      setError(false);
      setNoMovies(false);

      try {
        const results = await getSearch(query);
        if (results.length === 0) {
          setNoMovies(true);
        } else {
          setNoMovies(false);
        }
        setMovies(results);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <FilmSearch onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {error && <p className={styles.error}>Error loading movies..</p>}

      {!noMovies && movies.length > 0 ? (
        <ul className={styles.movieList}>
          {movies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={styles.movieLink}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        noMovies &&
        hasSearched &&
        !isLoading && <p className={styles.noMovies}>No movies found.</p>
      )}
    </div>
  );
}
