import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../store/users"


class NewUser extends Component {
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    this.updateHandler = this.updateHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  updateHandler(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  submitHandler(evt){
    evt.preventDefault();
    this.props.createNewUser({...this.state});
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    });
  }

  render() {
    const { firstName, lastName, username, email, password } = this.state
    const { updateHandler, submitHandler } = this;

    return (
      <div className="create-student-form">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label>First Name</label>
            <input name="firstName" onChange={updateHandler} value={firstName} />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" onChange={updateHandler} value={lastName} />
          </div>
          <div>
            <label>Username</label>
            <input name="username" onChange={updateHandler} value={username} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" onChange={updateHandler} value={email} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" onChange={updateHandler} value={password} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createNewUser: (userObject) => dispatch(createNewUser(userObject))
  }
}

export default connect(null, mapDispatch)(NewUser)
