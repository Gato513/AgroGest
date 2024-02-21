import TopNav from "@/components/navs/TopNav";

export default function RootLayout({ children }) {
  return (

    <>
      <TopNav />
      {children}
    </>
  );
}
