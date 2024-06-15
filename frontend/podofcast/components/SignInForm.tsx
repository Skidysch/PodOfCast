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
import Link from "next/link";
import Image from "next/image";
import SignInBg from "/public/sign-in-bg.jpg";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-full">
      <div className="w-1/2 flex items-center backdrop-blur">
        <div className="flex flex-col gap-10 px-2 max-w-[536px] mx-auto items-center">
          <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
            Sign in to your
            <br />
            account
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
              <div className="flex flex-wrap gap-5 justify-between w-full">
                <p className="text-sm font-medium mt-5">
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="ml-[2px] text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm font-medium mt-5">
                  Forgot password?{" "}
                  <Link
                    href="/restore-password"
                    className="text-primary hover:underline"
                  >
                    Restore
                  </Link>
                </p>
              </div>
              <Button className="button w-[260px]" type="submit">
                SIGN IN
              </Button>
            </form>
          </Form>
          <p className="font-bold">OR</p>
          <OAuthSection />
        </div>
      </div>
      <div className="w-1/2 h-[960px] relative overflow-hidden">
        <Image src={SignInBg} layout="fill" objectFit="cover" objectPosition="center" alt="Sign in image" className="absolute inset-0"/>
      </div>
    </div>
  );
};

export default SignInForm;
