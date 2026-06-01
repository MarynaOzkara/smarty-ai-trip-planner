import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <section className="flex-center bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <SignIn />
    </section>
  );
};

export default Login;
