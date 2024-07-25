import { twMerge } from "tailwind-merge";

interface Heading3Props {
  text: string;
  classes?: string;
}

const Heading3: React.FC<Heading3Props> = ({ text, classes }) => {
  return (
    <h3 className={twMerge('text-3xl font-semibold text-black', classes)}>
      {text}
    </h3>
  );
};

export default Heading3;
