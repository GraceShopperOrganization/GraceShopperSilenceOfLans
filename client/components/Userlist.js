import React from "react";
import { fetchUsers } from "../store/userlist";
import { connect } from "react-redux";

class Userlist extends React.Component {
  componentDidMount() {
    try {
      this.props.loadUsers();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const users = this.props.users || [];
    return (
      <div className="userlist">
        <h3>Users</h3>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
            </tr>

            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.Userlist,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Userlist);
