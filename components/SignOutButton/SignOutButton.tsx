import { signOut } from "@/auth";
import { Button } from "../ui/button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
}
