"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import BASE_URL from "@/constants";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  interface FormValues {
    username: string;
    password: string;
  }

  interface User {
    id: string;
    username: string;
  }

  const onSubmit = async (val: FormValues): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, val);
      if (response.data) {
        toast("Амжилттай нэвтэрлээ", { duration: 3000 });
      }
      interface CustomJwtPayload extends JwtPayload {
        role: string;
      }
      const decodedToken = jwtDecode<CustomJwtPayload>(response.data.token);
      if (decodedToken.role === "ADMIN") {
        router.push("/admin");
        return;
      } else if (decodedToken.role === "USER") {
        router.push("/customer");
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
          <h1 className="text-[34px] font-[600]">Нэвтрэх</h1>
          <p className="text-[14px] font-[400] text-gray-400">
            Тавтай морилно уу...
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
                          placeholder="Нэвтрэх нэрээ оруулна уу"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Нууц үгээ оруулна уу"
                          type="password"
                          className="focus-visible:ring-0 border-gray-400"
                        />
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
          </form>
        </Form>
      </div>
      <div className="rounded-md overflow-hidden ">
        {" "}
        <Image
          src={`/history_mongolia.jpg`}
          width={800}
          height={300}
          className="h-[700px] object-fit bg-no-repeat rounded-md mr-[20px] border-[2px] border-blue-500"
          alt="bg-image"
        />
      </div>
    </div>
  );
}

export default Login;
