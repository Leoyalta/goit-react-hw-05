import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-API";
import Loader from "../Loader/Loaader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { moviesId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!moviesId) {
      setError(true);
      return;
    }

    const fetchMovieCast = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await getMovieCast(moviesId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [moviesId]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w200/";

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <p className={css.error}>Error loading movie cast.</p>}
      {cast.length > 0 && (
        <ul className={css.castList}>
          {cast.map(({ cast_id, name, character, profile_path }) => (
            <li key={cast_id} className={css.castItem}>
              <p className={css.castName}>{name}</p>
              {profile_path && (
                <img
                  src={`${imageBaseUrl}${profile_path}`}
                  alt={name}
                  className={css.castImage}
                />
              )}
              <p className={css.castRole}>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
