import { themes } from "../../utils/themes";
import { useTheme } from "../../context/ThemeContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-3">
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`w-6 h-6 rounded-full border-2 transition
            ${theme === key ? "border-white scale-110" : "border-transparent"}`}
          style={{ backgroundColor: `rgb(${themes[key].accent})` }}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
