// import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => signOut();
  return <Button onClick={handleSignOut}>Sign Out</Button>;
  // return (
  //   <form
  //     action={async () => {
  //       "use server";
  //       await signOut();
  //     }}
  //   >
  //     <button>Sign out</button>
  //   </form>
  // );
}
