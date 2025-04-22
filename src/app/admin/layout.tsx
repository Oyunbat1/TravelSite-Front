import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Appsidebar from "@/app/admin/component/Appsidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Appsidebar />
      <main className="flex flex-col bg-slate-300 w-screen bg-[url('/history_mongolia.jpg')] bg-cover bg-no-repeat">
        {" "}
        {children}
      </main>
    </SidebarProvider>
  );
}
