import { Button } from "../ui/button";
import { signIn } from "@/auth";

const SignInButton = ({
  provider,
  callback,
  ...props
}: { provider?: string; callback?: string } & React.ComponentPropsWithRef<
  typeof Button
>) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, {
          redirect: true,
          redirectTo: callback,
        });
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
};

export default SignInButton;
