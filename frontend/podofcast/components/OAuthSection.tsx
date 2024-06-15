import { Button } from "./ui/button";
import { useOAuthLogin } from "@/lib/reactQuery/authMutations";

const OAuthSection = () => {
  const { mutate, isPending } = useOAuthLogin();

  return (
    <div className="flex flex-col gap-5">
      <Button
        variant="outline"
        className="button--light w-[260px]"
        onClick={() => mutate({ provider: "google-oauth2" })}
        disabled={isPending}
      >
        {isPending ? "LOADING..." : "SIGN IN WITH GOOGLE"}
      </Button>
      <Button
        variant="outline"
        className="button--light w-[260px]"
        onClick={() => mutate({ provider: "spotify" })}
        disabled={isPending}
      >
        {isPending ? "LOADING..." : "SIGN IN WITH SPOTIFY"}
      </Button>
    </div>
  );
};

export default OAuthSection;
