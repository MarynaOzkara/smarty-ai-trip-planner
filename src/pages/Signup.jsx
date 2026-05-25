import { SignUp } from "@clerk/react";

const Signup = () => {
  return (
    <section className="flex-center bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <SignUp signInUrl="/login" forceRedirectUrl={"/create-trip"} />
    </section>
  );
};

export default Signup;
