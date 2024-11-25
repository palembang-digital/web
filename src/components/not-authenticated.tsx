import { SignIn } from "@/components/sign-in";

export default function NotAuthenticated() {
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="flex flex-col gap-4 items-center">
          <p>Harap login terlebih dahulu.</p>
          <SignIn text="Login" />
        </div>
      </div>
    </div>
  );
}
