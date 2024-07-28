"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heading5, Icons } from "@/src/components/atoms";
import { getPrevPage } from "@/src/lib/helpers";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPage = useMemo(() => getPrevPage(pathname), [pathname]);

  return (
    <button 
      className="flex w-fit cursor-pointer items-center gap-2 
      hover:text-gray-80" 
      onClick={() => prevPage.link ? router.push(prevPage.link) : router.back()}
    >
      <Icons.left className="h-6 w-6 text-inherit" />
      <Heading5 text={prevPage.name} font="semibold" classes="text-inherit" />
    </button>
  );
};

export default BackButton;
