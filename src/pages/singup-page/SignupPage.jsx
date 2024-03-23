import React, { useState } from "react";
import { Input, Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const toast = useToast();

  const onHandleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, userName } = formData;
    if (!email || !password || !userName) {
      toast({
        title: "Validation failed!",
        description: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { data } = await axios.post(BASE_URL + "/user/signup", formData);

    if (data?.success) {
      toast({
        title: "Account Created successfully.",
        description: "Please login with the email and password",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="max-w-[500px] mx-auto border px-8 py-6 rounded-lg mt-12 shadow-xl">
        <h1 className="mb-6 text-xl text-gray-600 font-bold">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="my-3">
            <label htmlFor="email">Full Name</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="text"
              id="userName"
              value={formData.userName}
              placeholder="John Doe"
            />
          </div>
          <div className="my-3">
            <label htmlFor="email">Email</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="email"
              value={formData.email}
              id="email"
              placeholder="example@xyz.com"
            />
          </div>
          <div className="my-3">
            <label htmlFor="password">Password</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="password"
              value={formData.password}
              id="password"
              minLength={6}
              placeholder="******"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" colorScheme="blue" className="w-full">
              Sign up
            </Button>
          </div>
          <div>
            <div>
              <p className="text-right text-sm mt-2">
                Already have account?{" "}
                <Link to={"/login"} className="text-sky-500 hover:text-sky-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
