
import Content from "@/layout/main/Content"
import Hero from "@/layout/main/Hero"
import Persuratan from "@/layout/main/Persuratan"
import PortoNasum from "@/layout/main/PortoNasum"
import PortoPage from "@/layout/main/PortoPage"

export default function Home() {
  return (
    <>
      <Hero />
      <Content />
        <PortoPage />
        <PortoNasum />
        <Persuratan />
    </>
  )
}
