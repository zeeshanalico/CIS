import { toast } from "@/components/ui/use-toast";

type ToastType = "success" | "error" | "warn";

const showToast = (message: string, type: ToastType) => {
  let toastStyles = {};

  switch (type) {
    case "success":
      toastStyles = {
        title: "Success",
        description: message,
        variant: "success",
      };
      break;
    case "error":
      toastStyles = {
        title: "Error",
        description: message,
        variant: "destructive",
      };
      break;
    case "warn":
      toastStyles = {
        title: "Warning",
        description: message,
        variant: "warning",
      };
      break;
    default:
      break;
  }

  toast({
    ...toastStyles,
    duration: 3000, // 3 seconds
  });
};

export default showToast;
