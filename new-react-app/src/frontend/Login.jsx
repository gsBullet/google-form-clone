import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [formErrors, setFormErrors] = useState();
  const { checkAuth, setcheckAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(checkAuth?.isAuth && window?.prevURL?.pathname){
      navigate(window?.prevURL?.pathname);
    }
   if (checkAuth?.isAuth) {
      navigate("/");
    }
  },[checkAuth]);

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setFormErrors({}); // Initialize formErrors as an empty object

    fetch(`http://localhost:5000/submit`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        let data = await res.json();
        return {
          status: res.status,
          data,
        };
      })
      .then((res) => {
        if (res.status === 422) {
          let tempError = {
            email: [],
            password: [],
          };
          res.data.errors.forEach((e, index) => {
            if (!tempError[e.path]) {
              tempError[e.path] = [];
            }
            tempError[e.path].push(
              <li key={index} className="text-danger">
                {e.msg}
              </li>
            );
          });
          setFormErrors(tempError);
        }
        if (res.status === 200) {
          
          window.localStorage.setItem("gsmToken", res.data.token);
          setcheckAuth({
            isAuth: true,
            gsmToken: res.data.token,
          });
          
        } 
      });
  }

  return (
    <>
    {
      !checkAuth?.isAuth ?
      <div>
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header">
                        <h3 className="text-center font-weight-light my-4">
                          Login
                        </h3>
                      </div>
                      <div className="card-body">
                        <form
                          method="POST"
                          onSubmit={submitHandler}
                          encType="multipart/form-data"
                          action="/submit"
                        >
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="email"
                              type="email"
                              name="email"
                            />
                            <label htmlFor="inputEmail">Email address</label>
                            <ul>{formErrors?.email}</ul>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="inputPassword"
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                            <label htmlFor="inputPassword">Password</label>
                            <ul>{formErrors?.password}</ul>
                          </div>
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright © Your Website 2023
                  </div>
                  <div>
                    <Link to="#">Privacy Policy</Link>·
                    <Link to="#">Terms &amp; Conditions</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
      :
      ''
    }
    </>
  );
};

export default Login;
