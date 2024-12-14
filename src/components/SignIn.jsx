import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import * as Yup from "yup";

const SignIn = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  // Validation schema using Yup
  const schema = Yup.object().shape({
    emailId: Yup.string().email("Invalid Email Format").required("Required"),
    password: Yup.string().required("Required"),
  });

  // Handle form input changes
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent form reload

    try {
      // Validate form data
      await schema.validate(formData, { abortEarly: false });
      
      // API request to sign in
      const signInResponse = await axios.post(
        `${API_KEY}/user/signin`,
        {
          username: formData.emailId,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     
      // Redirect after successful sign-in
      navigate("/dashboard"); // Adjust the path as needed
      sessionStorage.setItem("username", signInResponse.data.username)
      document.cookie = `acc_token=${signInResponse.data.token}; expires=${new Date(Date.now + 30 *60*1000).toUTCString()} path=/`;
    } catch (error) {
      // Handle validation or API errors
      if (error.name === "ValidationError") {
        console.error("Validation Errors:", error.errors);
        alert(error.errors.join("\n")); // Display validation errors
      } else {
        console.error("Sign In Error:", error.message);
        alert("Failed to sign in. Please try again.");
      }
    }
  };

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <div className="border max-w-[80vw] min-w-[90vw] lg:max-w-[40vw] lg:min-w-[30vw] h-[90vh] bg-white">
        <div className="text-center mt-2 lg:mt-10">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-4">Enter your credentials to access your account</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col align-center justify-center items-center h-[50vh]"
        >
          <input
            onChange={handleFormChange}
            value={formData.emailId}
            type="email"
            name="emailId"
            placeholder="Email Id"
            className="border w-[80vw] lg:w-[20vw] p-2"
          />
          <input
            onChange={handleFormChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="mt-4 border w-[80vw] lg:w-[20vw] p-2"
          />
          <button
            type="submit"
            className="bg-slate-800 text-white w-[80vw] lg:w-[20vw] mt-5 p-2"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">Don't have an account? <span onClick={navigate('/')} className="text-blue-400 cursor-pointer">Sign Up</span></p>
      </div>
    </div>
  );
};

export default SignIn;
