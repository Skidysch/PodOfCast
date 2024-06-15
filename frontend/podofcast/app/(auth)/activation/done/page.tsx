import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[630px] min-h-[540px] flex flex-col justify-center gap-5">
      <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
        Your account has been successfully activated!
      </h1>
      <p className="text-2xl text-destruction text-center font-medium leading-relaxed ">
        Now you can sign in and enjoy our platform. Good luck!
      </p>
      <Button className="button self-center" asChild>
        <Link href="/sign-in">SIGN IN</Link>
      </Button>
    </div>
  );
}
