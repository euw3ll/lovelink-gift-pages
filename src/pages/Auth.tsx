import Login from "./Login";
import Register from "./Register";

interface AuthProps {
  initialMode: "login" | "register";
}

const Auth = ({ initialMode }: AuthProps) => {
  return initialMode === "register" ? <Register /> : <Login />;
};

export default Auth;
