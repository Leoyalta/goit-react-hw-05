import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-API";
import Loader from "../Loader/Loaader";
import { useEffect, useState } from "react";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!moviesId) {
      setError(true);
      return;
    }

    const fetchMovieReviews = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const dataReviews = await getMovieReviews(moviesId);
        setReviews(dataReviews);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [moviesId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p className={styles.error}>Error loading movie reviews.</p>}
      {reviews.length > 0 && (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewAuthor}>Author: {review.author}</p>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
