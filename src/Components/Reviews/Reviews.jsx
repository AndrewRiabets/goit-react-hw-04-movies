import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { reviewsAPI } from "../../Services/moviesAPI";
import styles from "./Reviews.module.css";

export default function Cast() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    reviewsAPI(moviesId).then(setReviews);
  }, []);
  const { reviewsSt__txt, reviewsSt__title, reviewsSt__item, reviewsSt } =
    styles;
  return (
    <ul className={reviewsSt}>
      {reviews && reviews.total_pages === 0 ? (
        <p>Sorry, there are no reviews for this movie.</p>
      ) : (
        reviews &&
        reviews.results.map((review) => (
          <li key={review.id} className={reviewsSt__item}>
            <h3 className={reviewsSt__title}>Author name: {review.author}</h3>
            <p className={reviewsSt__txt}>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
}
