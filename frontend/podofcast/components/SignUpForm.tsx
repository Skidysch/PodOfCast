"use client";

import { useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import SignUpBg from "/public/sign-up-bg.jpg";
import { useRegister } from "@/lib/reactQuery/authMutations";
import { useRedirectIfAuthenticated } from "@/lib/hooks/useRedirectIfAuthenticated";
import useAuthStore from "@/store/useAuthStore";
import "/app/styles/forms.css";
import OAuthSection from "@/components/OAuthSection";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  re_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  is_creator: z.boolean(),
});

const SignUpForm = () => {
  useRedirectIfAuthenticated();
  const { mutate, isPending } = useRegister();
  const { errorMessage, clearState } = useAuthStore();

  useEffect(() => {
    clearState();
  }, []);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      re_password: "",
      is_creator: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await mutate(values);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  }

  return (
    <div className="flex w-full">
      <div className="w-1/2 h-[960px] relative overflow-hidden">
        <Image
          src={SignUpBg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Sign in image"
          className="absolute inset-0"
        />
      </div>
      <div className="w-1/2 flex items-center backdrop-blur">
        <div className="flex flex-col gap-10 px-2 max-w-[536px] mx-auto items-center">
          <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
            Create account
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 form"
            >
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
                name="re_password"
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
              <FormField
                control={form.control}
                name="is_creator"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 self-start">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="form-label">
                      Are you a content creator?
                    </FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-5 justify-center w-full">
                <p className="text-sm font-medium mt-5">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="ml-[2px] text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              <Button
                className="button w-[260px]"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "LOADING..." : "SIGN UP"}
              </Button>
              {errorMessage && <p className="form-error">{errorMessage}</p>}
            </form>
          </Form>
          <p className="font-bold">OR</p>
          <OAuthSection />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
