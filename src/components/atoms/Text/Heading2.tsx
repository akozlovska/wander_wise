import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface Heading2Props {
  text: string;
  classes?: string;
  font: "semibold"| "medium" | "normal";
}

const Heading2: React.FC<Heading2Props> = ({ text, classes, font }) => {
  return (
    <h2 className={twMerge(`font-${font} text-4xl text-black`, classes)}>
      {text}
    </h2>
  );
};

export default memo(Heading2);
