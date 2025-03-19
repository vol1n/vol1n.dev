import Image from "next/image";
import { MainLink } from "@/components/MainLink";
import ParticleBackground from "@/components/BackgroundAnimation";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ParticleBackground />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <h1 className="text-8xl font-bold">Colin Ryan</h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-[16px]">
            <MainLink href="/blog" text="Blog" />
            <MainLink href="/projects" text="Projects" />
            <MainLink href="mailto:colin.ryan.ga@gmail.com" text="Contact" />
          </div>
          <div className="flex gap-[16px]">
            <MainLink href="https://x.com/vol1n" text="X" />
            <MainLink href="https://github.com/vol1n" text="GitHub" />
            <MainLink href="https://linkedin.com/in/colin-p-ryan" text="LinkedIn" />
          </div>
        </div>
      </main>
    </div>
  );
}
