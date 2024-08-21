"use client";

import { Button } from "@/components/ui/button";
import { useActivation } from "@/api/reactQuery/authMutations";
import Loader from '@/components/Loader'

export default function Home({
  params,
}: {
  params: { uid: string; token: string };
}) {
  const { mutate, isPending } = useActivation();

  return (
    <div className="mx-auto max-w-full md:max-w-[630px] min-h-96 md:min-h-[540px] px-4 backdrop-blur flex flex-col justify-center items-center gap-5 md:gap-10">
      <h1 className="max-w-[400px] md:max-w-full text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight">
        Account activation!
      </h1>
      <p className="max-w-[400px] md:max-w-full md:text-2xl text-destruction text-center font-medium leading-relaxed ">
        Click here to activate your account.
      </p>
      <Button
        className="button self-center"
        onClick={async () => await mutate(params)}
      >
        {isPending ? <Loader /> : "ACTIVATE"}
      </Button>
    </div>
  );
}
