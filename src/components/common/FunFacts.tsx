import { harryPotterFacts } from "@/app/data/harryPotterFunFacts";

export function FunFacts() {
  const randomIndex = Math.floor(Math.random() * harryPotterFacts.length);
  const fact = harryPotterFacts[randomIndex];

  return (
    <div className="bg-card py-10">
      <div className="text-center text-primary font-serif text-xl mb-4">
        ✨ Harry Potter Fun Fact ✨
      </div>
      <p className="text-foreground text-lg italic text-center mb-6">
        "{fact}"
      </p>
    </div>
  );
}
