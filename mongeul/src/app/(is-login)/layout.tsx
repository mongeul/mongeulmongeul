import Header from "@/components/header/orgamisms/Header";
import Navbar from "@/components/navbar/organisms/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex w-full lg:w-2/3 lx:w-1/2 justify-center mx-auto min-h-screen p-4 pb-24">
        {children}
      </main>
      <Navbar />
    </>
  );
}
