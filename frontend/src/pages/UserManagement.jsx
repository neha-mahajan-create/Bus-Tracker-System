import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Card,
  Badge,
  Form,
} from "react-bootstrap";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getUsers,
  searchUsers,
} from "../services/userService";

function UserManagement() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    try {

      const res = await getUsers();

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearch = async (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value === "") {

      loadUsers();

      return;

    }

    try {

      const res = await searchUsers(value);

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout>

      <Container fluid>

        <Card className="shadow p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>👥 Manage Users</h3>

            <Badge bg="primary" pill>

              Total Users : {users.length}

            </Badge>

          </div>

          <Form.Control
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={handleSearch}
            className="mb-4"
          />

          <Table
            striped
            bordered
            hover
            responsive
          >

            <thead className="table-dark">

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Registered On</th>

                <th>Feedback Given</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.length > 0 ? (

                users.map((user) => (

                  <tr key={user._id}>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      {new Date(user.createdAt)
                        .toLocaleDateString()}
                    </td>

                    <td>{user.feedbackCount}</td>

                    <td className="action-links">

                      <span
                        className="edit-link"
                        onClick={() =>
                          alert(
                            `User: ${user.name}\n\nEmail: ${user.email}\n\nFeedback Submitted: ${user.feedbackCount}`
                          )
                        }
                      >
                        View
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >

                    No Users Found

                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card>

      </Container>

    </DashboardLayout>

  );

}

export default UserManagement;