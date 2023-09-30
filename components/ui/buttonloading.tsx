import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type ButtonLoadingProps = {
  children: ReactNode;
};

export function ButtonLoading({ children }: ButtonLoadingProps) {
  return (
    <Button disabled variant="secondary">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
