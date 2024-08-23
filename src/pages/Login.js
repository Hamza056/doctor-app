import React, { useEffect } from "react";
import { Logoicon } from "../assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../api/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // NOTE: This should be set based on some kind of toggle or theme selector.
    // I've added this here for demonstration purposes
    localStorage.setItem("theme", "light");

    // If the user has selected a theme, use that
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);

      // Else if the users OS preferences prefers dark mode
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");

      // Else use light mode
    } else {
      document.body.classList.add("light");
    }
  }, []);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    agree: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      login(values.name, values.password, navigate);
      // Handle form submission
    },
  });
  return (
    <div className="bg-bgLogin h-lvh flex justify-center items-center ">
      <form onSubmit={formik.handleSubmit} className="w-10/12">
        <div className="bg-bgCard dark:bg-none max-w-xl m-auto rounded-md border-slate-50 border w-10/12 pt-9">
          <div className="flex justify-center flex-col mx-auto items-center">
            <img src={Logoicon} alt="Logo icon" className="max-w-16" />
            <h2 className="text-textColor font-bold">LOGIN</h2>
          </div>
          <div className="flex justify-center flex-col p-8 ">
            <div className="flex justify-center flex-col">
              <label htmlFor="name" className="text-textColor">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your Name"
                className="text-textColor p-2 rounded-full focus:text-textColor focus:ring-0 placeholder-textColor outline-none border-slate-300 border-solid border bg-bgCard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              <div className="text-red-500 text-sm mt-1 min-h-8">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <label htmlFor="email" className="text-textColor">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                className="text-textColor p-2 rounded-full focus:text-textColor focus:ring-0 placeholder-textColor outline-none border-slate-300 border-solid border bg-bgCard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <div className="text-red-500 text-sm mt-1 min-h-8">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <label htmlFor="password" className="text-textColor">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
                className="text-textColor p-2 rounded-full focus:text-textColor focus:ring-0 placeholder-textColor outline-none border-slate-300 border-solid border bg-bgCard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              <div className="text-red-500 text-sm mt-1 min-h-8">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-white dark:border-gray-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.agree}
                />
                <label
                  htmlFor="agree"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>

              <div className="text-red-500 text-sm mt-1 min-h-8">
                {formik.touched.agree && formik.errors.agree}
              </div>
            </div>

            <button
              type="submit"
              className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
