import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

const Login = ({ onLogin }) => {
  return (
    <div className="glass p-8 w-[350px] text-center">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <input
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 rounded-xl glass"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 px-4 py-2 rounded-xl glass"
      />

      <button
        onClick={onLogin}
        className="w-full py-2 rounded-xl
                   bg-accent text-white
                   hover:bg-accentHover transition"
      >
        Login
      </button>
    </div>
  );
};



export default Login;
