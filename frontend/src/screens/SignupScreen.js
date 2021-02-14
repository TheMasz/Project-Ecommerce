import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { signup } from "../actions/userActions";

export default function SignupScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, error } = userSignup;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match!");
    } else {
      dispatch(signup(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="row signup-page-section space-evenly py-3">
      <div className="signup-form-section">
        <form onSubmit={submitHandler}>
          <h1 className="text-title-form">Sign Up</h1>
          <p className="py-2 text-sub-form">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`} className="text-blue">
              Sign In
            </Link>
          </p>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <p className="py-2 text-sub-form">Name</p>
            <input
              type="text"
              className="input_form"
              id="name"
              placeholder="Enter Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Email Address</p>
            <input
              type="email"
              className="input_form"
              id="email"
              placeholder="you@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Password</p>
            <input
              type="password"
              className="input_form"
              id="password"
              placeholder="Enter 6 charater or more"
              required
              minLength='6'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Confirm Password</p>
            <input
              type="password"
              className="input_form"
              id="confirmPassword"
              placeholder="Enter Confirm Password"
              required
              minLength='6'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="primary block mt-4" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <img
        src="./assets/images/shopping2.png"
        alt="shopping"
        style={{ width: "50%" }}
      />
    </div>
  );
}
