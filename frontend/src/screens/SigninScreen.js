import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  },[props.history, redirect, userInfo]);
  return (
    <div className="row signin-page-section space-evenly py-3">
      <div className="signin-form-section">
        <form onSubmit={submitHandler}>
          <h1 className="text-title-signin-form">Sign In</h1>
          <p className="py-2 text-sub-signin-form">
            Doesn't have an account yet?{" "}
            <Link to={`/signup?redirect=${redirect}`} className="text-blue">
              Sign Up
            </Link>
          </p>
          {error&&<MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <p className="py-2 text-sub-signin-form">Email Address</p>
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
            <p className="py-2 text-sub-signin-form">Password</p>
            <input
              type="password"
              className="input_form"
              id="password"
              placeholder="Enter 6 charater or more"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="primary block mt-4" type="submit">
            Sign In
          </button>
        </form>
      </div>

      <img
        src="./assets/images/shopping.png"
        alt="shopping"
        style={{ width: "50%" }}
      />
    </div>
  );
}
