import { SignUp } from "@clerk/react";

const Register = () => {
  return (
    <section className="flex-center bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <SignUp signInUrl="/login" forceRedirectUrl={"/create-trip"} />
    </section>
  );
};

export default Register;
