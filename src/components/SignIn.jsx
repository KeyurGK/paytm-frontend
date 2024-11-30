import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const schema = Yup.object().shape({
    emailId: Yup.string().email("Invalid Email Format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = () => {
    const errorData = schema.validate(formData);
    if (errorData) {
      alert("Error");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center ">
      <div className="border max-w-[80vw] min-w-[90vw] lg:max-w-[40vw] lg:min-w-[30vw] h-[90vh] bg-white">
        <div className=" text-center mt-2 lg:mt-10">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-4">Enter your credentials to access your account</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className=" flex flex-col align-center justify-center items-center h-[50vh]"
        >
          <input
            onChange={handleFormChange}
            value={formData.emailId}
            type="email"
            name="emailId"
            placeholder="Email Id"
            className=" border w-[80vw] lg:w-[20vw] p-2"
          />
          <input
            onChange={handleFormChange}
            value={formData.password}
            type="text"
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
        <p className="text-center mt-4">Don't have an account? Sign Up</p>
      </div>
    </div>
  );
};

export default SignIn;
