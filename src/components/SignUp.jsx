import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const schema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    emailId: Yup.string().email("Invalid Email Format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    event.preventDefault(); // Prevent form reload

    try {
      // Validate form data
      await schema.validate(formData, { abortEarly: false });
      
      // API request to sign in
      const signUpResponse = await axios.post(
        `${API_KEY}/api/v1/user/signup`,
        {
          username: formData.emailId,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/"); // Adjust the path as needed
    }catch (error) {
      // Handle validation or API errors
      if (error.name === "ValidationError") {
        console.error("Validation Errors:", error.errors);
        alert(error.errors.join("\n")); // Display validation errors
      } else {
        console.error("Sign Up Error:", error.message);
        alert("Failed to sign up. Please try again.");
      }
    }
  }
  const handleNavigate = () => {
    navigate("/sign-in");
  };

    return (
      <div className="bg-slate-800 h-screen flex justify-center items-center ">
      <div className="border max-w-[80vw] min-w-[90vw] lg:max-w-[40vw] lg:min-w-[30vw] h-[90vh] bg-white">
          <div className=" text-center mt-2 lg:mt-10">
          <h1 className="text-3xl font-bold">
              Sign Up
          </h1>
          <p className="mt-4">Enter your information to create an account</p>
          </div>
          
      <form onSubmit={handleFormSubmit} className=" flex flex-col align-center justify-around items-center h-[50vh]">
        <input
          onChange={handleFormChange}
          value={formData.firstName}
          type="text"
          name="firstName"
                  placeholder="First Name"
                  className="mt-4 border w-[80vw] lg:w-[20vw] p-2"
        />
        <input
          onChange={handleFormChange}
          value={formData.lastName}
          type="text"
          name="lastName"
                  placeholder="Last Name"
                  className="mt-4 border w-[80vw] lg:w-[20vw] p-2"
        />
        <input
          onChange={handleFormChange}
          value={formData.emailId}
          type="email"
          name="emailId"
                  placeholder="Email Id"
                  className="mt-4 border w-[80vw] lg:w-[20vw] p-2"
        />
        <input
          onChange={handleFormChange}
          value={formData.password}
          type="text"
          name="password"
                  placeholder="Password"
                  className="mt-4 border w-[80vw] lg:w-[20vw] p-2"
        />
        <button type="submit" className="bg-slate-800 text-white w-[80vw] lg:w-[20vw] mt-5 p-2">Sign Up</button>
          </form>
          <p className="text-center mt-4">Already have an account? <span onClick={handleNavigate}  className="cursor-pointer text-blue-400">Login</span></p>
            </div>
            </div>
  );
};

export default SignUp;
