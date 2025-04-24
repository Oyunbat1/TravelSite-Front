"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BASE_URL from "@/constants";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

function Register() {
  const router = useRouter();
  const handleToLogin = () => {
    router.push("/login");
  };
  const formSchema = z
    .object({
      email: z.string().email(),
      username: z.string().min(2).max(50),
      password: z.string().min(8),
      confirmpassword: z.string().min(8),
      role: z.enum(["ADMIN", "USER"]),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Passwords do not match",
      path: ["confirmpassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmpassword: "",
      role: "USER",
    },
  });
  interface FormValues {
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
  }

  interface User {
    id: string;
    email: string;
    username: string;
  }

  const onSubmit = async (val: FormValues): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, val);
      const user: User = response.data;
      if (user) {
        toast("Хэрэглэгч амжилттай бүртгэгдлээ.", {
          description: "Одоо та нэвтэрч болно.",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center h-screen">
      <div className="w-[500px]   ml-[160px]">
        {" "}
        <div className="mb-[30px]">
          <h1 className="text-[34px] font-[600]">
            Хэрэглэгчийн бүртгэл үүсгэх
          </h1>
          <p className="text-[14px] font-[400] text-gray-400">
            Бүртгэлээ үүсгээд монголын гайхамшигтай танилцаарай...
          </p>
        </div>
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
                          placeholder="Нэвтрэх нэрээ оруулна уу..."
                          type="text"
                          className="focus-visible:ring-0 border-gray-400"
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
                          placeholder="Емайлээ оруулна уу..."
                          className="focus-visible:ring-0 border-gray-400"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Нууц үгээ оруулна уу..."
                          type="password"
                          className="focus-visible:ring-0 border-gray-400"
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
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Нууц үгээ баталгаажуулна уу..."
                          type="password"
                          className="focus-visible:ring-0 border-gray-400"
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
                  name="role"
                  render={({ field }) => (
                    <FormItem className="h-[38px] border-[1px] rounded-md border-gray-400 text-[14px] pl-2 focus-visible:ring-0">
                      <FormControl>
                        <select
                          {...field}
                          className="border-gray-400  focus-visible:ring-0 text-gray-500"
                        >
                          <option className="text-[12px]" value="USER">
                            Хэрэглэгч
                          </option>
                          <option className="text-[12px]" value="ADMIN">
                            Админ
                          </option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-red-600" />
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
            <div
              className="text-blue-600 text-[14px] mt-1 ml-[330px] border-b w-[52px] cursor-pointer"
              onClick={handleToLogin}
            >
              Нэвтрэх
            </div>
          </form>
        </Form>
      </div>
      <div className="rounded-md overflow-hidden ">
        {" "}
        <Image
          src={`/history_mongolia.jpg`}
          width={700}
          height={300}
          className="h-[600px] object-fit bg-no-repeat rounded-md mr-[30px] border-[2px] border-blue-500"
          alt="bg-image"
        />
      </div>
    </div>
  );
}

export default Register;
