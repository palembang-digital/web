import { Button } from "@//components/ui/button";
import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Masuk</Button>
    </form>
  );
}
