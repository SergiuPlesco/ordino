import { signOut } from "@/auth";
import { Button } from "../ui/button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirect: true,
          redirectTo: "/",
        });
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
}
