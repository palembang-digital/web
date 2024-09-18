import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="text-xs text-neutral-500 hover:underline"
      >
        Keluar
      </button>
    </form>
  );
}
