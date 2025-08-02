import Content from "@/layout/main/Content";
import Hero from "@/layout/main/Hero";
import QuickStats from "@/layout/main/QuickStats";
import Footer from "@/layout/main/Footer";


export default function Home() {
  return (
    <>
      <Hero />
      <Content />
      <QuickStats></QuickStats>
      <Footer></Footer>
    </>
  );
}
