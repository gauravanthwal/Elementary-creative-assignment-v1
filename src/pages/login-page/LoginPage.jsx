import React, { useState } from "react";
import { Input, Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const onHandleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast({
        title: "Validation failed!",
        description: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await axios.post(BASE_URL + "/user/login", formData);
      if (data?.success) {
        localStorage.setItem("token", data?.token);
        toast({
          title: "Login success",
          description: "Login successfull.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Login failed",
        description: err?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // const {data} = res;
  };
  return (
    <div>
      <div className="max-w-[500px] mx-auto border px-8 py-6 rounded-lg mt-12 shadow-xl">
        <h1 className="mb-6 text-xl text-gray-600 font-bold">Login</h1>
        <form onSubmit={onSubmit}>
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
              placeholder="******"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" colorScheme="blue" className="w-full">
              Login
            </Button>
          </div>
          <div>
            <div>
              <p className="text-right text-sm mt-2">
                Don't have account?{" "}
                <Link
                  to={"/signup"}
                  className="text-sky-500 hover:text-sky-600"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
