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

const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  passwordRepeat: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    console.log(values);
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
            name="password"
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
            name="passwordRepeat"
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
          <Button className="button w-[260px]" type="submit">
            SAVE
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
