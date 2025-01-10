// src/app/(private)/layout.tsx


// Project imports
import AuthGuard from "@/components/AuthGuard";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div>{children}</div>
    </AuthGuard>
  );
}
