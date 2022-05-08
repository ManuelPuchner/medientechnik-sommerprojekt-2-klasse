import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ProtectedRoute from "./ProtectedRoute";

const authRoutes = ["/account"];

export default function AuthWrapper({ children }) {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return null;
  }
  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
}
