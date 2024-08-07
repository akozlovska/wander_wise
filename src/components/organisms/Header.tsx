/* eslint-disable max-len */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar, RoundedButton, UnstyledButton } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";
import { useUser, useModal } from "@/src/store";
import { Modal } from "@/src/services";

const Header: React.FC = () => {
  const { user } = useUser();
  const { setOpenModal } = useModal();

  return (
    <header
      className="flex items-center justify-between bg-white px-10 py-7"
    >
      <Link href={Routes.HOME} className="relative h-10 w-48">
        <Image
          src="/logo.svg"
          alt="Wander Wise logo"
          fill
          sizes="192px"
          priority={true}
        />
      </Link>
      {user ? (
        <Navbar />
      ) : (
        <div className="flex items-center gap-8">
          <UnstyledButton 
            text="Login"
            onClick={() => setOpenModal(Modal.SIGN_IN)}
            classes="w-16"
          />
          <RoundedButton 
            text="Sign Up" 
            style="dark" 
            classes="w-36" 
            onClick={() => setOpenModal(Modal.SIGN_UP)} 
          />
        </div>
      )}
    </header>
  );
};

export default Header;
