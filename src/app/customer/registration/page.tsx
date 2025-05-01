"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BASE_URL from "@/constants";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import ScaleImageSection from "../components/ScaleImageSection";
interface FormValues {
  email: string;
  username: string;
  phoneNumber: string;
  travelName: string;
  FavoriteTravelName: string;
}
function page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("register hesgiin", isLoggedIn);
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    phoneNumber: z
      .string()
      .regex(/^\d{8}$/, "Phone number must be exactly 8 digits"),
    travelName: z.string().min(2).max(50),
    FavoriteTravelName: z.string().min(2).max(50),
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      phoneNumber: "",
      travelName: "",
      FavoriteTravelName: "",
    },
  });

  const onSubmit = async (val: FormValues): Promise<void> => {
    try {
      if (!isLoggedIn) {
        toast.error("Та нэвтэрч орно уу.", {
          duration: 3000,
          action: {
            label: "Нэвтрэх",
            onClick: () => (window.location.href = "/login"),
          },
        });
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/customerRegistration/create`,
        val
      );
      const user = response.data;
      if (user) {
        toast("Амжилттай бүртгэгдлээ.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ScaleImageSection />
      <div className="w-screen h-[800px] bg-gray-200 flex justify-center items-center  ">
        <div className="relative">
          {" "}
          <Image
            src={"/terkhiintsagaan.png"}
            width={950}
            height={400}
            alt="bg"
            className="mr-[200px] rounded-md shadow-2xl z-10"
          />
          <div
            className="w-[500px] h-[540px] bg-white absolute top-[60px] left-[490px] rounded-md shadow-2xl flex flex-col justify-center items-center
          "
          >
            <h1 className="text-[32px] text-blue-600 mb-4">
              Аялалд бүртгүүлэх
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {" "}
                <div className="flex flex-col gap-2 w-[400px]">
                  {" "}
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Таны нэр..."
                              type="text"
                              className="!ring-0 !focus:ring-0 outline-none  border-gray-400 h-[50px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Емайл..."
                              className="focus-visible:ring-0 border-gray-400 h-[50px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Утасны дугаар..."
                              type="text"
                              className="focus-visible:ring-0 border-gray-400 h-[50px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {" "}
                    <FormField
                      control={form.control}
                      name="travelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Аялалын нэр..."
                              type="text"
                              className="focus-visible:ring-0 border-gray-400 h-[50px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="FavoriteTravelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="та хэзээний аялал сонирхож байна вэ?"
                              type="text"
                              className="focus-visible:ring-0 border-gray-400 h-[50px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 " />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="bg-blue-600 text-white mt-2 hover:bg-blue-400"
                    type="submit"
                  >
                    Үргэлжлүүлэх
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
