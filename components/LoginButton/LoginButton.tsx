import { Button } from "../ui/button";
// import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  const handleLogin = () => signIn("google");
  return <Button onClick={handleLogin}>LoginButton</Button>;
  // return (
  //   <form
  //     action={async () => {
  //       "use server";

  //       try {
  //         await signIn("google");
  //       } catch (error) {
  //         if (error instanceof AuthError) {
  //           console.log(error);
  //           throw error;
  //         }
  //       }
  //     }}
  //   >
  //     <Button>LoginButton</Button>
  //   </form>
  // );
};

export default LoginButton;
