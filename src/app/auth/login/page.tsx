import dynamic from "next/dynamic";
const SigninPage = dynamic(() => import("@/components/auth/SigninPage"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <div>
      <SigninPage />
    </div>
  );
}
