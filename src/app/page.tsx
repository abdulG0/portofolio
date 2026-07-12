import { HeroCinematic } from "@/components/hero-cinematic";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell hideHeader>
      <HeroCinematic />
    </SiteShell>
  );
}
