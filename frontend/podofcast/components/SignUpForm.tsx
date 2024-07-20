"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRegister } from "@/api/reactQuery/authMutations";
import Loader from "@/components/Loader";
import OAuthSection from "@/components/OAuthSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import "/app/styles/forms.css";
import SignUpBg from "/public/sign-up-bg.jpg";

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
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="w-1/2 h-[960px] relative overflow-hidden max-lg:hidden"
      >
        <Image
          src={SignUpBg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Sign in image"
          className="absolute inset-0"
        />
      </motion.div>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center backdrop-blur"
      >
        <div className="flex flex-col gap-5 md:gap-10 px-2 max-w-[536px] mx-auto items-center">
          <h1 className="text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight">
            Create account
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
                className="button form-button"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "SIGN UP"}
              </Button>
              {errorMessage && <p className="form-error">{errorMessage}</p>}
            </form>
          </Form>
          <p className="font-bold">OR</p>
          <OAuthSection />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
