import Content from "@/layout/main/Content";
import Hero from "@/layout/main/Hero";
import QuickStats from "@/layout/main/QuickStats";



export default function Home() {
  return (
    <>
    <div className=" bg-slate-50 dark:bg-slate-800 dark:text-slate-50">

      <Hero />
      <Content />
      <QuickStats></QuickStats>
    </div>
    </>
  );
}
