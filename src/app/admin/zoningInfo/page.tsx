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
  const [zoneInfo, setZoneInfo] = useState<FormValues[]>([]);

  const fetchGeoInfo = async () => {
    try {
      const response = await axios(`${BASE_URL}/zoning/withProvinces`);
      const data = await response.data;
      setZoneInfo(data.zoningCategories);
    } catch (err) {
      console.error("Error fetching geoInfo:", err);
    }
  };
  useEffect(() => {
    fetchGeoInfo();
  }, []);
  const router = useRouter();
  const formSchema = z.object({
    zoneName: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zoneName: "  ",
    },
  });
  interface FormValues {
    zoneName: string;
  }
  const onSubmit = async (val: FormValues): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/zoning/create`, val);
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
      <div className="w-[1000px] h-auto bg-white z-30 items-center justify-center p-4 shadow-lg rounded-xl mt-[20px] ml-[30px]">
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
                  <FormLabel className="mb-2">Бүсчлэл оруулах</FormLabel>{" "}
                  <FormField
                    control={form.control}
                    name="zoneName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Бүсчлэл..."
                            type="text"
                            className="focus-visible:ring-0 border-gray-400 w-[840px]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className="w-[840px] bg-blue-600 text-white mt-4 hover:bg-blue-400"
                type="submit"
              >
                Нэмэх
              </Button>
            </div>
          </form>
        </Form>
        <div className="w-[1200px]">
          <div className="flex justify-between mt-[10px] ">
            <h1 className="mr-[460px]">Бүсчлэл мэдээлэл</h1>
          </div>{" "}
          <table className="border w-[980px] mt-[20px] rounded-md border-blue-600 ">
            {zoneInfo.map((el, index) => (
              <tr
                key={index}
                className="flex  justify-between  border-blue-600 "
              >
                <td className="  border-blue-600 flex justify-center items-center border-b-2 border-b-blue-600 w-full py-[10px]">
                  {el.zoneName}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
