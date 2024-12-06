import "./style.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, Col, Form, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegisterFunction = (data) => {
    // axios
    //   .post("http://localhost:4005/userregistration", data)
    //   .then((response) => {
    //     if (response?.data?.status === 1) {
    //       toast.success(response?.data?.description);
    //       localStorage.setItem(
    //         "UserData",
    //         JSON.stringify(response?.data?.data)
    //       );
    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 500);
    //     } else {
    //       toast.error(response?.data?.description);
    //     }
    //   });
    const existingUsers =
      JSON.parse(localStorage.getItem("RegisterdData")) || [];

    // Check if email already exists
    const isEmailExist = existingUsers?.some(
      (user) => user?.email === data.email.trim()
    );

    if (isEmailExist) {
      toast.error(
        "This email is already registered."
      );
      return;
    }

    // Append the new user data
    const updatedUsers = [...existingUsers, data];
    localStorage.setItem("RegisterdData", JSON.stringify(updatedUsers));

    toast.success("Registration successful!");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <>
      <div className="d-flex align-items-center vh-100">
        <Row className="m-5 w-100">
          <Col md="4" className=""></Col>
          <Col md="4">
            <Card className="p-2 main">
              <p className="fw-bold main-class">Registration</p>
              <Form onSubmit={handleSubmit(handleRegisterFunction)}>
                <Col className="p-2">
                  <Label>User Name</Label>
                  <Controller
                    name="uname"
                    type="text"
                    control={control}
                    rules={{
                      required: "User Name is Required",
                      validate: (value) =>
                        value.trim() !== "" || "User Name is Required",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter User Name"
                      />
                    )}
                  />
                  {errors.uname && (
                    <span className="error-style">
                      {errors?.uname?.message}
                    </span>
                  )}
                </Col>
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
                    Register
                  </Button>
                </Col>
              </Form>
              <div className="text-center mt-3 mb-1">
                <span>
                  Already have and account? <a href="/login">Sign in</a>
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

export default Register;
