import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignIn } from "@clerk/react";

const redirectUrl =
  import.meta.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || "/generate-trip";

const LoginDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-90 p-0">
        <SignIn fallbackRedirectUrl={redirectUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
