import { useState } from "react";
import axios from "axios";
import "../styles/feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || feedback.trim() === "") {
      alert("Please give rating and feedback.");
      return;
    }

    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      // Send feedback to backend
      const response = await axios.post(
        "http://localhost:5001/api/feedback/add",
        {
          userId: user.id,
          rating,
          message: feedback,
        }
      );

      alert(response.data.message);

      // Clear form
      setRating(0);
      setFeedback("");

    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Failed to submit feedback");
      }
    }
  };

  return (
    <div className="feedback-container">
      <h2>Give Your Feedback</h2>

      <form onSubmit={handleSubmit}>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                fontSize: "35px",
                color: star <= rating ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          rows="6"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;