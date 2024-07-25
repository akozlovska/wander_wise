import { twMerge } from "tailwind-merge";

interface ErrorTextProps {
  errorText: string;
  classes?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({errorText, classes}) => {
  return <p className={twMerge('text-sm text-error', classes)}>{errorText}</p>;
};

export default ErrorText;