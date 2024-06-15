import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function Home({
  params,
}: {
  params: { uid: string; token: string };
}) {
  return <ResetPasswordForm params={params} />;
}
