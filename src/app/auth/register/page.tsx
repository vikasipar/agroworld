import dynamic from "next/dynamic";
const SignupPage = dynamic(() => import("@/components/auth/SignupPage"), {
  ssr: false,
});

function RegisterPage() {
  return (
    <div>
      <SignupPage />
    </div>
  );
}

export default RegisterPage;
