"use client";

import { memo } from "react";
import Link from "next/link";
import { ModalTemplate } from "@/src/components/organisms";
import { PrimaryButton, RoundedButton } from "@/src/components/molecules";
import { useRouter } from "next/navigation";

interface EmptyFallbackModalProps {
  title: string;
  subtitle: string;
  buttonText: string;
  path: string;
}

const EmptyFallbackModal: React.FC<EmptyFallbackModalProps> 
= ({ title, subtitle, buttonText, path }) => {
  const router = useRouter();

  return (
    <ModalTemplate 
      title={title}
      subtitle={subtitle}
      isClosable={false}
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <Link href={path} className="h-full">
          <PrimaryButton text={buttonText} classes="h-full" />
        </Link>

        <RoundedButton
          text="Go back"
          onClick={router.back}
          style="light"
        />
      </div>
    </ModalTemplate>
  );
};

export default memo(EmptyFallbackModal);