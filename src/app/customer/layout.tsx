import Header from "@/app/customer/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {" "}
      <Header />
      {children}
    </main>
  );
}
