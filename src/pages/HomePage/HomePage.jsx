import { getProductsApi } from "../../movies-API";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loaader";
import { useLocation } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await getProductsApi();
        setMovies(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {error && (
        <p className={styles.error}>Error fetching data: {error.message}</p>
      )}
      {movies.length > 0 && (
        <>
          <h2 className={styles.homeTitle}>Trending Week</h2>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}
