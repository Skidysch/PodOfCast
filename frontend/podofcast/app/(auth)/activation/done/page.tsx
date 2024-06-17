import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-full md:max-w-[630px] min-h-96 md:min-h-[540px] px-4 backdrop-blur mx-auto flex flex-col justify-center items-center gap-5 md:gap-10">
      <h1 className="max-w-[400px] md:max-w-full text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight">
        Your account has been successfully activated!
      </h1>
      <p className="max-w-[400px] md:max-w-full md:text-2xl text-destruction text-center font-medium leading-relaxed ">
        Now you can sign in and enjoy our platform. Good luck!
      </p>
      <Button className="button self-center" asChild>
        <Link href="/sign-in">SIGN IN</Link>
      </Button>
    </div>
  );
}
