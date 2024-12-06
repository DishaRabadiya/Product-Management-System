import "./style.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, Col, Form, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFunction = (data) => {
    axios.post("http://localhost:4005/userlogin", data).then((response) => {
      if (response?.data?.status === 1) {
        toast.success(response?.data?.description);
        localStorage.setItem("UserData", JSON.stringify(response?.data?.data));
        setTimeout(() => {
          navigate("/product");
        }, 500);
      } else {
        toast.error(response?.data?.description);
      }
    });
  };

  return (
    <>
      <div className="d-flex align-items-center vh-100">
        <Row className="m-5 w-100">
          <Col md="4" className=""></Col>
          <Col md="4">
            <Card className="p-2 main">
              <p className="fw-bold main-class">Login Here</p>
              <Form onSubmit={handleSubmit(handleLoginFunction)}>
                <Col className="p-2">
                  <Label>Email</Label>
                  <Controller
                    name="email"
                    type="text"
                    control={control}
                    rules={{
                      required: "Email is Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                      validate: (value) =>
                        value.trim() !== "" || "Email is Required",
                    }}
                    render={({ field }) => (
                      <Input {...field} type="text" placeholder="Enter Email" />
                    )}
                  />
                  {errors.email && (
                    <span className="error-style">
                      {errors?.email?.message}
                    </span>
                  )}
                </Col>
                <Col className="p-2">
                  <Label>Password</Label>
                  <Controller
                    name="password"
                    type="password"
                    control={control}
                    rules={{
                      required: "Password is Required",
                      validate: (value) =>
                        value.trim() !== "" || "Password is Required",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter Password"
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="error-style">
                      {errors?.password?.message}
                    </span>
                  )}
                </Col>
                <Col className="p-2">
                  <Button style={{ background: "#006400" }} type="submit">
                    Login
                  </Button>
                </Col>
              </Form>
              <div className="text-center mt-3 mb-1">
                <span>
                  Don't have an account? <a href="/register">Sign up</a>
                </span>
              </div>
            </Card>
          </Col>
          <Col md="4" className=""></Col>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
