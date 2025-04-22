"use client";
import React, { useEffect, useState } from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

function Page() {
  const [geoInfo, setGeoInfo] = useState<FormValues[]>([]);

  const fetchGeoInfo = async () => {
    try {
      const response = await axios(`${BASE_URL}/info/get`);
      const data = await response.data;
      setGeoInfo(data.created);
    } catch (err) {
      console.error("Error fetching geoInfo:", err);
    }
  };
  useEffect(() => {
    fetchGeoInfo();
  }, []);
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(2),
    content: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  interface FormValues {
    title: string;
    content: string;
  }
  const onSubmit = async (val: FormValues): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/info/create`, val);
      const info = response.data;
      if (info) {
        toast("Амжилттай нэмэгдлээ.", {
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex">
      <div className="w-[1200px] h-auto bg-white z-30 items-center justify-center p-4 shadow-lg rounded-xl mt-[20px] ml-[30px]">
        <Form {...form}>
          <h1 className="mb-4 font-normal text-2xl border-b pb-2 border-b-blue-600">
            Газаргүйн мэдээлэл оруулах хэсэг
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" border-b border-b-blue-600 pb-4"
          >
            <div className="flex flex-col gap-1 items-center">
              <div className="flex gap-2">
                {" "}
                <div>
                  <FormLabel className="mb-1">Гарчиг</FormLabel>{" "}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Гарчиг..."
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
                  <FormLabel className="mb-1">Газаргүйн мэдээлэл</FormLabel>{" "}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Агуулга..."
                            rows={4}
                            className="w-[1000px] p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className="w-[200px] bg-blue-600 text-white mt-4 hover:bg-blue-400"
                type="submit"
              >
                Нэмэх
              </Button>
            </div>
          </form>
        </Form>
        <div className="w-[1200px]">
          <div className="flex justify-between mt-[10px] ">
            <h1 className="ml-[130px]">Гарчиг</h1>
            <h1 className="mr-[380px]">Газаргүйн мэдээлэл</h1>
          </div>{" "}
          <table className="border w-[1140px] mt-[20px] rounded-md border-blue-600 ">
            {geoInfo.map((el, index) => (
              <div key={index} className="h-auto ">
                <tr className="flex  justify-between border-b  border-blue-600 ">
                  <td className=" w-[300px] border-r  border-blue-600 flex justify-center items-center">
                    {el.title}
                  </td>
                  <td className="w-[720px] h-[70px] overflow-scroll  no-scrollbar m-2 ">
                    {el.content}
                  </td>
                </tr>
              </div>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
