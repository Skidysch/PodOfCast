"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLogin } from "@/api/reactQuery/authMutations";
import Loader from "@/components/Loader";
import OAuthSection from "@/components/OAuthSection";
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
import { useRedirectIfAuthenticated } from "@/hooks/useRedirect";
import useAuthStore from "@/store/useAuthStore";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import "/app/styles/forms.css";
import SignInBg from "/public/sign-in-bg.jpg";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const SignInForm = () => {
  useRedirectIfAuthenticated();
  const { mutate, isPending } = useLogin();
  const { errorMessage, clearErrorMessage } = useAuthStore();

  useEffect(() => {
    clearErrorMessage();
  }, []);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      await mutate(values);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  }

  return (
    <div className="flex w-full">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        exit={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center backdrop-blur"
      >
        <div className="flex flex-col gap-5 md:gap-10 px-4 max-w-[536px] mx-auto items-center">
          <h1 className="text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight">
            Sign in to your
            <br />
            account
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="form">
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
              <div className="flex flex-wrap md:gap-5 justify-between w-full">
                <p className="text-sm font-medium md:mt-5">
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="ml-[2px] text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm font-medium md:mt-5">
                  Forgot password?{" "}
                  <Link
                    href="/restore-password"
                    className="text-primary hover:underline"
                  >
                    Restore
                  </Link>
                </p>
              </div>
              <Button
                className="button form-button"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "SIGN IN"}
              </Button>
              {errorMessage && <p className="form-error">{errorMessage}</p>}
            </form>
          </Form>
          <p className="font-bold">OR</p>
          <OAuthSection />
        </div>
      </motion.div>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="w-1/2 h-[960px] relative overflow-hidden max-lg:hidden"
      >
        <Image
          src={SignInBg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Sign in image"
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  );
};

export default SignInForm;
