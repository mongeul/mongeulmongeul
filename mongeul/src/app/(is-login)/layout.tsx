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
      <main className="flex w-full md:w-3/4 lg:w-1/2 mx-auto min-h-screen p-4 pb-24">
        {children}
      </main>
      <Navbar />
    </>
  );
}
