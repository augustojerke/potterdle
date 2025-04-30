"use client";
import { useRouter } from "next/navigation";

export function PotterdleTitle() {
  const router = useRouter();
  return (
    <div className="relative" onClick={() => router.push("/dashboard")}>
      <h1
        className="absolute top-3 left-1/2 -translate-x-1/2 font-HarryFont text-[3rem] text-amber-300 py-5 text-center 
              bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 bg-clip-text text-transparent
              drop-shadow-[0_0_8px_#f59e0b,0_0_15px_#b45309] 
              animate-[shine_2s_ease-in-out_infinite] hover:animate-[sparkle_1.5s_ease-in-out] 
              transition-all duration-300 hover:scale-105 cursor-default z-10 hover:cursor-pointer"
      >
        Potterdle
      </h1>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-1/4 w-0.5 h-10 bg-amber-400 opacity-0 
                animate-[lightning_3s_linear_infinite_1s]"
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-0.5 h-8 bg-yellow-300 opacity-0 
                animate-[lightning_3s_linear_infinite_2s] rotate-12"
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-200 opacity-0 
                animate-[spark_4s_ease-out_infinite]"
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-0 
                animate-[spark_5s_ease-out_infinite_1s]"
        ></div>
      </div>
    </div>
  );
}
