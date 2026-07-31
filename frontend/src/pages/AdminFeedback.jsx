import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { Table, Badge, Spinner } from "react-bootstrap";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/feedback");

      setFeedbacks(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">View Feedback</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {feedbacks.map((item) => (
              <tr key={item._id}>

                <td>{item.name}</td>

                <td>{item.email}</td>

                <td>{"⭐".repeat(item.rating)}</td>

                <td>{item.message}</td>

                <td>
                  <Badge bg="warning">
                    {item.status}
                  </Badge>
                </td>

              </tr>
            ))}

          </tbody>

        </Table>
      )}

    </DashboardLayout>
  );
}

export default AdminFeedback;