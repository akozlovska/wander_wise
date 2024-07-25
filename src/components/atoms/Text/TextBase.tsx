import { twMerge } from "tailwind-merge";

interface TextBaseProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal" | "medium";
}

const TextBase: React.FC<TextBaseProps> = ({ text, classes, font }) => {
  return (
    <p className={twMerge(`font-${font} text-base text-black`, classes)}>
      {text}
    </p>
  );
};

export default TextBase;