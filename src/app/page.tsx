import CoreStage from "@/components/gl/CoreStage";
import Hero from "@/components/sections/Hero";
import Belief from "@/components/sections/Belief";
import CoreReveal from "@/components/sections/CoreReveal";
import Ecosystem from "@/components/sections/Ecosystem";
import Systems from "@/components/sections/Systems";
import GrowthLoop from "@/components/sections/GrowthLoop";
import AIEmployees from "@/components/sections/AIEmployees";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Persistent WebGL stage — the Quantum Core lives here, choreographed by scroll */}
      <CoreStage />

      <main className="relative z-10">
        <Hero />
        <Belief />
        <CoreReveal />
        <Ecosystem />
        <Systems />
        <GrowthLoop />
        <AIEmployees />
        <Industries />
        <Process />
        <Founder />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
