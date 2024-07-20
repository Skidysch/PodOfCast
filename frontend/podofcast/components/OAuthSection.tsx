import { useOAuthLogin } from "@/api/reactQuery/authMutations";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

const OAuthSection = () => {
  const { mutate, isPending } = useOAuthLogin();

  return (
    <div className="flex flex-col gap-5">
      <Button
        variant="outline"
        className="button button--light form-button"
        onClick={() => mutate({ provider: "google-oauth2" })}
        disabled={isPending}
      >
        {isPending ? <Loader /> : "CONTINUE WITH GOOGLE"}
      </Button>
      <Button
        variant="outline"
        className="button button--light form-button"
        onClick={() => mutate({ provider: "spotify" })}
        disabled={isPending}
      >
        {isPending ? <Loader /> : "CONTINUE WITH SPOTIFY"}
      </Button>
    </div>
  );
};

export default OAuthSection;
