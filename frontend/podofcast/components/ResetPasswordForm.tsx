"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "/app/styles/forms.css";
import { useResetPassword } from "@/api/reactQuery/authMutations";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import Loader from "@/components/Loader";

const ResetPasswordSchema = z.object({
  uid: z.string().max(3),
  token: z.string().max(100),
  new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  re_new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const ResetPasswordForm = ({
  params,
}: {
  params: { uid: string; token: string };
}) => {
  const { mutate, isPending } = useResetPassword();
  const { clearState, errorMessage } = useAuthStore();
  const { uid, token } = params;

  useEffect(() => {
    clearState();
  }, []);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      uid: uid,
      token: token,
      new_password: "",
      re_new_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    await mutate(values);
  }

  return (
    <div className="flex flex-col justify-center gap-10 px-2 max-w-[536px] min-h-[540px] mx-auto items-center">
      <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
        Reset password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 form">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  Password <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="re_new_password"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  Repeat Password <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="Repeat Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-error" />
              </FormItem>
            )}
          />
          <Button
            className="button w-[260px]"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "SAVE"}
          </Button>
          {errorMessage && <p className="form-error">{errorMessage}</p>}
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
