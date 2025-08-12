import Content from "@/layout/main/Content";
import Hero from "@/layout/main/Hero";
import QuickStats from "@/layout/main/QuickStats";
import Header from '@/components/main/Header'
import Footer from "@/components/main/Footer"


export default function Home() {
  return (
    <>
    <div className="bg-gray-100 dark:bg-slate-800 dark:text-slate-50">
      <Header></Header>
      <Hero />
      <Content />
      <QuickStats></QuickStats>
      <Footer></Footer>
    </div>
    </>
  );
}
