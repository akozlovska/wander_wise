import { twMerge } from "tailwind-merge";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal";
}

const Heading: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return (
    <h1 className={twMerge(`font-${font} text-5xl text-black`, classes)}>
      {text}
    </h1>
  );
};

export default Heading;
