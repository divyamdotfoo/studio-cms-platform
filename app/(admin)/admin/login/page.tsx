import { Suspense } from "react";
import { LoginForm } from "../../_components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
