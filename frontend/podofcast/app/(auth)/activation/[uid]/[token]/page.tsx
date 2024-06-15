"use client";

import { Button } from "@/components/ui/button";
import { useActivation } from "@/lib/reactQuery/authMutations";

export default function Home({
  params,
}: {
  params: { uid: string; token: string };
}) {
  const { mutate } = useActivation();

  return (
    <div className="max-w-[630px] min-h-[540px] flex flex-col justify-center gap-5">
      <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
        Account activation!
      </h1>
      <p className="text-2xl text-destruction text-center font-medium leading-relaxed ">
        Click here to activate your account.
      </p>
      <Button
        className="button self-center"
        onClick={async () => await mutate(params)}
      >
        ACTIVATE
      </Button>
    </div>
  );
}
