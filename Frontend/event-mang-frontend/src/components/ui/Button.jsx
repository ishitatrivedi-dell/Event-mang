const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 rounded-xl bg-accent hover:bg-accentHover
               text-white transition-all active:scale-95"
  >
    {children}
  </button>
);

export default Button;
