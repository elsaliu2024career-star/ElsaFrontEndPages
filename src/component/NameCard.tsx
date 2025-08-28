import "./NameCard.css";
import type { Person } from "../type";

/*
export interface Person {
  person_name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
}
*/
export function NameCard({ person_name, role, avatar, rating, review,}: Person ) {
  return (
    <div className="card">
      <div className="profile">
        <div className="avatar">{avatar}</div>
        <div>
          <div className="name">{person_name}</div>
          <div className="role">{role}</div>
        </div>
      </div>
      <div className="rating">{'★'.repeat(rating)}</div>
      <p className="review">
        {review}
      </p>
    </div>
  );
}
