import axiosInstance from "../axiosInstance";

export const login = async (username, password, navigate) => {
  try {
    const response = await axiosInstance.post(
      "https://dummyjson.com/auth/login",
      {
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }
    );
    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Navigate after setting the token
      window.location.href = "/dashboard";
    } else {
      console.error("Token not found in the response");
    }
  } catch (error) {
    console.log(error);
  }
};
