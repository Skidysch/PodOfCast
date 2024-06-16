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
import { useRestorePassword } from "@/api/reactQuery/authMutations";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import Loader from "@/components/Loader";

const RestorePasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const RestorePasswordForm = () => {
  const { mutate, isPending } = useRestorePassword();
  const { clearState, errorMessage } = useAuthStore();

  useEffect(() => {
    clearState();
  }, []);

  const form = useForm<z.infer<typeof RestorePasswordSchema>>({
    resolver: zodResolver(RestorePasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RestorePasswordSchema>) {
    try {
      await mutate(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center gap-10 px-2 max-w-[536px] min-h-[540px] mx-auto items-center">
      <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
        Forgot password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 form">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  Email <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="Email"
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
            {isPending ? <Loader /> : "CONTINUE"}
          </Button>
          {errorMessage && <p className="form-error">{errorMessage}</p>}
        </form>
      </Form>
    </div>
  );
};

export default RestorePasswordForm;
