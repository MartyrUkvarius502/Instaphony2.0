// src/app/(private)/layout.tsx

import AuthGuard from "@/components/AuthGuard";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard redirectPath="/register">
      <div>{children}</div>
    </AuthGuard>
  );
}
