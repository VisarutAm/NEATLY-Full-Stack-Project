import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAuth from "../../context/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [currState, setCurrState] = useState("Sign in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser, signIn } = userAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (currState === "Sign Up") {
        if (!email || !password || !displayName) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }
        result = await signUpNewUser(email, password, displayName);
      } else {
        if (!email || !password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }
        result = await signIn(email, password);
      }

      if (result.success) {
        toast.success(`${currState} successful! 🎉`);
        setTimeout(() => {
          onClose();
          navigate("/");
        }, 300);
      } else {
        setError(result.error || `${currState} failed`);
        toast.error(result.error || `${currState} failed`);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">{currState}</h2>

        {currState === "Sign Up" && (
          <input
            type="text"
            placeholder="Your name"
            className="border rounded w-full p-2 mb-3"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="border rounded w-full p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded w-full p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          type="submit"
          disabled={loading}
        >
          {loading ? `${currState}...` : currState}
        </button>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}

        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2" required />
          <span className="text-sm text-gray-600">
            By continuing, I agree to the terms of use & privacy policy.
          </span>
        </div>

        {currState === "Sign Up" ? (
          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-3 text-sm">
            Create a new account?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginModal;
