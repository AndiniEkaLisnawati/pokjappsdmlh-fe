"use client"
import { motion } from "framer-motion"
import Content from "@/layout/main/Content"; 
import Hero from "@/layout/main/Hero";
import QuickStats from "@/layout/main/QuickStats";
import Header from '@/components/main/Header'
import Footer from "@/components/main/Footer"
import HeroMarquee from "@/layout/main/HeroMarquee";

export default function Home() {
  return (
    <div className="">
      <Header />
          <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Hero />
      </motion.div>


      {/* Marquee */}
      <HeroMarquee />

      {/* Content section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Content />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <QuickStats />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
