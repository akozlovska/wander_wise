'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { useRefreshToken } from "@/src/queries";
import { LoadingStateWrapper } from "@/src/components/templates";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isInitialAuthorizing, setIsInitialAuthorizing] = useState(true);
  const { mutate: refresh } = useRefreshToken();

  useEffect(() => {
    refresh(undefined, {
      onSettled: () => setIsInitialAuthorizing(false),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <LoadingStateWrapper 
      isLoading={isInitialAuthorizing}
    >
      {children}
    </LoadingStateWrapper>
  );
};