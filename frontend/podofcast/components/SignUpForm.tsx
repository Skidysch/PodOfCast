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
import { Checkbox } from "@/components/ui/checkbox";
import "/app/styles/forms.css";
import Link from "next/link";
import Image from "next/image";
import SignUpBg from "/public/sign-up-bg.jpg";
import { Axios } from "axios";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  passwordRepeat: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  isCreator: z.boolean(),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      isCreator: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const axios = new Axios({
      baseURL: "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    });
    const res = await axios.post("/auth/users/create/", JSON.stringify(values));

    
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
              <div className="items-center self-start flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms1" className="form-label">
                    Are you a content creator?
                  </label>
                </div>
              </div>
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
              <Button className="button w-[260px]" type="submit">
                SIGN UP
              </Button>
            </form>
          </Form>
          <p className="font-bold">OR</p>
          <div className="flex flex-col gap-5">
            <Button variant="outline" className="button--light w-[260px]">
              <Link href="#">SIGN UP WITH GOOGLE</Link>
            </Button>
            <Button variant="outline" className="button--light w-[260px]">
              <Link href="#">SIGN UP WITH SPOTIFY</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
