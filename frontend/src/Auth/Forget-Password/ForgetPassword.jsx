import { IoIosArrowRoundBack, IoIosKey } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosWithoutAuth } from "../../Api/Axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosWithoutAuth.post(`/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setEmail("");
        navigate(`/auth/verify-pin?email=${encodeURIComponent(email)}`);  // Navigate with email in the query parameter
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen  fixed top-0 left-0 bg-white z-[999] w-full grid place-items-center">
        <div className="grid place-items-center gap-y-3">
          <IoIosKey className="text-5xl bg-gray-200 -scale-x-100 text-cyan-400 rounded-full p-2" />
          <h1 className="text-2xl font-medium">Forgot Password?</h1>
          <h6 className="text-sm text-gray-500">
            No worries, we&apos;ll send you reset instructions
          </h6>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-gray-600 font-medium leading-none">
                Email
              </label>
              <input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Make email input required
                className="flex h-10 w-full rounded-md border border-black/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`bg-gradient-to-r from-cyan-500 to-sky-500 w-full p-1 rounded-lg text-white mt-4 transition-all duration-700 hover:shadow-md ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send PIN"}
              </button>
              <NavLink
                to="/auth/login"
                className="w-full p-1 justify-center rounded-lg flex items-center gap-4 mt-4 hover:bg-white border border-transparent hover:border hover:border-sky-400 text-sky-400 duration-700 transition-all hover:shadow-md"
              >
                <IoIosArrowRoundBack className="text-lg" /> Back to login
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;