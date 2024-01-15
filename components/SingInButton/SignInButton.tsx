import { Button } from "../ui/button";
import { signIn } from "@/auth";

const SignInButton = ({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
};

export default SignInButton;
