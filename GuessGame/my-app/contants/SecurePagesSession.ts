'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const useSecurePagesSession = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/play");
    }
    else{
      router.push("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
    }
  }, [session, router]);

  return session;
};

export default useSecurePagesSession;