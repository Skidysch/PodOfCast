import { Button } from "./ui/button";
import { useOAuthLogin } from "@/api/reactQuery/authMutations";
import Loader from "@/components/Loader";

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
        {isPending ? <Loader /> : "SIGN IN WITH GOOGLE"}
      </Button>
      <Button
        variant="outline"
        className="button--light w-[260px]"
        onClick={() => mutate({ provider: "spotify" })}
        disabled={isPending}
      >
        {isPending ? <Loader /> : "SIGN IN WITH SPOTIFY"}
      </Button>
    </div>
  );
};

export default OAuthSection;
