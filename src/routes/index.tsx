import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Globe, Map as MapIcon } from "lucide-react";
import london from "@/assets/centre-london.jpg";
import vancouver from "@/assets/centre-vancouver.jpg";
import lisbon from "@/assets/centre-lisbon.jpg";
import dubai from "@/assets/centre-dubai.png";
import dushanbe from "@/assets/centre-dushanbe.jpg";
import toronto from "@/assets/centre-toronto.jpg";
import houston from "@/assets/centre-houston.webp";
import creatorPhoto from "@/assets/ayaan.jpg";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ismaili Centres — Places of Faith, Culture & Community" },
      { name: "description", content: "Explore the global network of seven Ismaili Centres — bridges between faith, culture and community across London, Vancouver, Lisbon, Dubai, Dushanbe, Toronto and Houston." },
      { property: "og:title", content: "Ismaili Centres — Places of Faith, Culture & Community" },
      { property: "og:description", content: "A cinematic journey through the seven Ismaili Centres around the world." },
    ],
  }),
  component: Index,
});

type Centre = {
  num: string;
  name: string;
  country: string;
  opened: string;
  image: string;
  architect: string;
  blurb: string;
  highlight: string;
  // approx position on a 100x50 map grid
  x: number;
  y: number;
};

const centres: Centre[] = [
  { num: "01", name: "London", country: "United Kingdom", opened: "1985", image: london, architect: "Casson Conder Partnership", blurb: "The first purpose-built Ismaili Centre in the West, set beside the Victoria & Albert Museum — a quiet, contemplative landmark in the heart of South Kensington.", highlight: "Roof Garden of paradise", x: 47, y: 18 },
  { num: "02", name: "Vancouver", country: "Canada", opened: "1985", image: vancouver, architect: "Bruno Freschi", blurb: "Rising from a reflecting pool with mountains as its backdrop, Vancouver's Centre evokes a Persian garden recast in West Coast light.", highlight: "Reflective courtyard", x: 14, y: 24 },
  { num: "03", name: "Lisbon", country: "Portugal", opened: "1998", image: lisbon, architect: "Raj Rewal & Frederico Valsassina", blurb: "A sun-warmed limestone composition of courtyards and gardens — the largest Ismaili Centre in the world.", highlight: "Charbagh gardens", x: 44, y: 26 },
  { num: "04", name: "Dubai", country: "UAE", opened: "2008", image: dubai, architect: "Rami el-Dahan & Soheir Farid", blurb: "Fatimid architectural traditions reborn in the Gulf — a luminous white pavilion set among palms and water.", highlight: "Fatimid arches", x: 60, y: 32 },
  { num: "05", name: "Dushanbe", country: "Tajikistan", opened: "2009", image: dushanbe, architect: "Farouk Noormohamed", blurb: "Drawing from Central Asian timurid heritage, Dushanbe's Centre is a meeting place of faith, learning and music in the Pamir foothills.", highlight: "Pamir gateway", x: 68, y: 28 },
  { num: "06", name: "Toronto", country: "Canada", opened: "2014", image: toronto, architect: "Charles Correa", blurb: "Crowned by a crystalline glass dome, the Toronto Centre frames the sky itself as a moving work of art.", highlight: "Crystalline dome", x: 22, y: 26 },
  { num: "07", name: "Houston", country: "United States", opened: "2025", image: houston, architect: "Farshid Moussavi", blurb: "A garden city pavilion — woven jaali screens, courtyards and water, calibrated for the Texan sun. The newest Ismaili Center, inaugurated in 2025.", highlight: "Jaali sun screens", x: 19, y: 32 },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function Logo({ size = 48, className = "", spin = false }: { size?: number; className?: string; spin?: boolean }) {
  return (
    <Globe
      size={size}
      className={`${spin ? "animate-rotate-slow" : ""} ${className} text-gold`}
    />
  );
}

function Index() {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/75 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} spin />
            <span className="font-serif text-xl tracking-wide text-foreground">Ismaili Centres</span>
          </div>
          <nav className="hidden md:flex gap-7 text-sm text-muted-foreground">
            <a href="#history" className="hover:text-gold transition-colors">History</a>
            <a href="#centres" className="hover:text-gold transition-colors">Centres</a>
            <a href="#jamatkhana" className="hover:text-gold transition-colors">Jamatkhana</a>
            <a href="#fatimid" className="hover:text-gold transition-colors">Fatimid Cairo</a>
            <a href="#values" className="hover:text-gold transition-colors">Values</a>
            <a href="#vision" className="hover:text-gold transition-colors">Vision</a>
            <a href="#creator" className="hover:text-gold transition-colors">Creator</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, oklch(0.7 0.15 80 / 0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />

        {/* floating globes instead of logos */}
        <Globe size={200} className="absolute top-28 right-10 text-gold opacity-10 animate-float" />
        <Globe size={140} className="absolute bottom-32 left-8 text-gold opacity-10 animate-rotate-slow" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-deep-2/60 backdrop-blur-sm mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold/90">A Global Network</span>
          </div>
          <Globe size={96} className="mx-auto mb-6 text-gold animate-rotate-slow animate-fade-up" />
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="block shimmer-text">Ismaili</span>
            <span className="block italic text-foreground">Centres</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Seven landmark buildings across four continents — places of faith,
            culture and community that bridge tradition with the contemporary world.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a href="#history" className="px-8 py-3 rounded-full bg-gold-gradient text-primary-foreground font-medium shadow-glow hover:scale-105 transition-transform">
              Begin the Journey
            </a>
            <a href="#jamatkhana" className="px-8 py-3 rounded-full border border-gold/40 text-foreground hover:border-crimson hover:text-crimson transition-colors">
              What is a Jamatkhana?
            </a>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            {[
              { n: "7", l: "Centres" },
              { n: "4", l: "Continents" },
              { n: "40+", l: "Years of legacy" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-serif text-5xl text-gold mb-1">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse-glow" />
        </div>
      </section>

      {/* HISTORY SLIDES */}
      <HistorySection />

      {/* QUOTE */}
      <QuoteSection />

      {/* MAP */}
      <MapSection active={active} setActive={setActive} />

      {/* CENTRES */}
      <section id="centres" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Seven Centres"
            title="A Global Family"
            sub="Each Centre is distinct in architecture yet united in spirit — drawing from local context while expressing a shared Ismaili identity."
            icon={MapIcon}
          />

          <div className="space-y-32 mt-24">
            {centres.map((c, i) => (
              <CentreRow key={c.name} centre={c} index={i} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* JAMATKHANA */}
      <JamatkhanaSection />

      {/* FATIMID */}
      <FatimidSection />

      {/* VALUES */}
      <ValuesSection />

      {/* VISION */}
      <VisionSection />

      {/* CREATOR */}
      <CreatorSection />

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="font-serif">Ismaili Centres</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            More than buildings — bridges connecting hearts, cultures and communities.
          </p>
        </div>
      </footer>
    </div>
  );
}

function HistorySection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const slides = [
    {
      id: "slide1",
      image: slide1,
      title: "Evolution & Diversity",
      subtitle: "Spaces Within the Muslim Ummah",
      description: "From the Kabah to the Prophet's Masjid, the architectural journey of the Ummah reflects a rich tapestry of faith and culture.",
    },
    {
      id: "slide2",
      image: slide2,
      title: "The Path Forward",
      subtitle: "From Jamatkhanas to Ismaili Centres",
      description: "A century of evolution in sacred space, moving from local gathering houses to global landmarks of pluralism.",
    },
    {
      id: "slide3",
      image: slide3,
      title: "Sacred Continuity",
      subtitle: "Diversity in Ismaili History",
      description: "Spaces of worship have evolved since the time of Prophet Muhammad (PBUH), giving a sense of belonging to Muslims worldwide and expressing the rich diversity of the Ismaili community.",
    },
  ];

  return (
    <section id="history" ref={ref} className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The Architectural Journey"
          title="A Legacy of Space"
          sub="Tracing the evolution of sacred architecture from the dawn of Islam to the contemporary Ismaili Centres."
          icon={Globe}
        />

        <div className={`mt-20 space-y-24 ${seen ? "animate-fade-up" : "opacity-0"}`}>
          {slides.map((slide, i) => (
            <div key={slide.id} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}>
              <div className="w-full md:w-3/5 relative group">
                <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-card aspect-video">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <div className="text-gold text-xs uppercase tracking-[0.3em]">{slide.subtitle}</div>
                <h3 className="font-serif text-4xl text-foreground">{slide.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {slide.description}
                </p>
                {i === 2 && (
                  <ul className="space-y-4 pt-4">
                    <li className="flex gap-3 text-sm text-muted-foreground italic">
                      <span className="text-gold">•</span>
                      "These spaces give a sense of belonging to Muslims around the world."
                    </li>
                    <li className="flex gap-3 text-sm text-muted-foreground italic">
                      <span className="text-gold">•</span>
                      "Expressing the rich diversity that exists within the Muslim Ummah."
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub, icon: Icon }: { eyebrow: string; title: string; sub: string; icon?: React.ElementType }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`text-center max-w-3xl mx-auto ${seen ? "animate-fade-up" : "opacity-0"}`}>
      <div className="text-xs uppercase tracking-[0.4em] text-gold mb-4">{eyebrow}</div>
      <h2 className="font-serif text-5xl md:text-7xl font-light mb-6">{title}</h2>
      <p className="text-lg text-muted-foreground leading-relaxed">{sub}</p>
      <div className="flex items-center justify-center gap-3 mt-8">
        <div className="h-px w-12 bg-gold/40" />
        {Icon ? <Icon className="w-6 h-6 text-gold" /> : <Logo size={24} />}
        <div className="h-px w-12 bg-gold/40" />
      </div>
    </div>
  );
}

function QuoteSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="py-32 px-6 bg-deep-2/30 relative overflow-hidden">
      <Logo size={420} className="absolute -right-32 -top-20 opacity-[0.07] animate-rotate-slow" />
      <div className={`max-w-4xl mx-auto text-center relative ${seen ? "animate-fade-up" : "opacity-0"}`}>
        <div className="text-gold text-6xl font-serif mb-6">"</div>
        <blockquote className="font-serif text-2xl md:text-4xl italic leading-relaxed text-foreground/90">
          The aesthetics of the environment we build, and the quality of the
          social interactions that take place within these environments,
          reverberate on our spiritual life.
        </blockquote>
        <div className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          — Mawlana Hazar Imam · Burnaby, 1982
        </div>
      </div>
    </section>
  );
}

function MapSection({ active, setActive }: { active: number; setActive: (n: number) => void }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="A Network of Light"
          title="Across the World"
          sub="From the Atlantic coast to Central Asia — seven points of connection on a single living map."
          icon={Globe}
        />
        <div className={`relative mt-16 aspect-[2/1] rounded-3xl overflow-hidden border border-border bg-deep-2/40 shadow-card ${seen ? "animate-fade-up" : "opacity-0"}`}>
          {/* stylized map background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 50" className="w-full h-full text-gold">
              {/* Stylized Continents */}
               {/* North America */}
               <path d="M5,12 L20,10 L32,15 L30,28 L20,35 L8,32 Z" fill="currentColor" />
               {/* South America */}
               <path d="M22,35 L30,35 L28,48 L20,45 Z" fill="currentColor" />
               {/* Europe */}
               <path d="M42,12 L55,10 L58,20 L48,25 L40,20 Z" fill="currentColor" />
               {/* Africa */}
               <path d="M45,25 L58,22 L62,35 L55,48 L42,42 Z" fill="currentColor" />
               {/* Asia */}
               <path d="M58,12 L85,10 L92,25 L80,38 L60,35 Z" fill="currentColor" />
               {/* Australia */}
               <path d="M82,38 L92,35 L95,45 L85,48 Z" fill="currentColor" />
               
               <path d="M0,0 L100,0 L100,50 L0,50 Z" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1,1" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* dots */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full">
            {centres.map((c, i) => (
              <g key={c.name} onMouseEnter={() => setActive(i)} className="group cursor-pointer">
                {/* Connection line to label if active */}
                {active === i && (
                  <line x1={c.x} y1={c.y} x2={c.x} y2={c.y - 4} stroke="oklch(0.58 0.2 25)" strokeWidth="0.2" opacity="0.5" />
                )}
                
                <circle 
                  cx={c.x} 
                  cy={c.y} 
                  r={active === i ? 1.5 : 0.8} 
                  fill={active === i ? "oklch(0.58 0.2 25)" : "oklch(0.7 0.1 40)"} 
                  className="transition-all duration-300"
                >
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </circle>

                <circle cx={c.x} cy={c.y} r="2.5" fill="oklch(0.58 0.2 25)" opacity="0">
                  <animate attributeName="r" values="1;4;1" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
                </circle>

                <text 
                  x={c.x} 
                  y={c.y - 5} 
                  textAnchor="middle" 
                  fontSize="1.4" 
                  fill="white" 
                  className={`font-medium pointer-events-none transition-all duration-300 ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                >
                  {c.name}
                </text>
              </g>
            ))}
          </svg>

          {/* active card overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-sm bg-background/95 backdrop-blur-md border border-gold/40 rounded-2xl p-5 shadow-glow">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-2">{centres[active].num} · {centres[active].country}</div>
            <div className="font-serif text-3xl mb-2">{centres[active].name}</div>
            <div className="text-sm text-muted-foreground">Opened {centres[active].opened} · {centres[active].architect}</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {centres.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${
                active === i
                  ? "bg-gold text-primary-foreground border-gold"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CentreRow({ centre, index, reverse }: { centre: Centre; index: number; reverse: boolean }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""} ${
        seen ? "animate-fade-up" : "opacity-0"
      }`}
    >
      <div className="relative group">
        <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
          <img
            src={centre.image}
            alt={`Ismaili Centre ${centre.name}`}
            loading="lazy"
            width={1280}
            height={896}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur border border-gold/50 flex items-center justify-center font-serif text-gold">
            {index + 1}
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3">{centre.country}</div>
        <h3 className="font-serif text-5xl md:text-6xl font-light mb-2">{centre.name}</h3>
        <div className="text-muted-foreground italic mb-6">{centre.architect} · Opened {centre.opened}</div>
        <p className="text-lg leading-relaxed text-foreground/85 mb-6">{centre.blurb}</p>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-deep-2/40">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold/90">{centre.highlight}</span>
        </div>
      </div>
    </div>
  );
}

function ValuesSection() {
  const values = [
    { t: "Spiritual Growth", d: "Quiet spaces for prayer, reflection and the inner journey." },
    { t: "Education & Learning", d: "Libraries, lectures and dialogue across generations." },
    { t: "Dialogue", d: "Bridges between faiths, cultures and civilisations." },
    { t: "Community", d: "Gatherings that weave belonging into everyday life." },
    { t: "Art & Beauty", d: "Architecture, gardens and patterns calibrated to lift the spirit." },
    { t: "Service", d: "Outward expressions of an ethic rooted in care for others." },
  ];
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section id="values" ref={ref} className="py-32 px-6 bg-deep-2/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="What They Hold"
          title="More Than Buildings"
          sub="Each Centre is a meeting of faith, intellect and beauty — designed to nurture both the individual and the community."
        />
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 ${seen ? "animate-fade-up" : "opacity-0"}`}>
          {values.map((v, i) => (
            <div
              key={v.t}
              className="group p-8 rounded-2xl border border-border bg-background/70 backdrop-blur hover:border-gold/50 hover:bg-deep-2/80 hover:shadow-card transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Logo size={40} className="mb-5 group-hover:rotate-45 transition-transform duration-700" />
              <h3 className="font-serif text-2xl mb-2">{v.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section id="vision" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-80" />
      <Logo size={600} className="absolute -left-40 top-1/2 -translate-y-1/2 opacity-10 animate-rotate-slow" />
      <div className={`relative max-w-4xl mx-auto text-center ${seen ? "animate-fade-up" : "opacity-0"}`}>
        <div className="text-xs uppercase tracking-[0.4em] text-gold mb-6">The Vision</div>
        <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-10">
          A <em className="text-crimson not-italic">living</em> bridge between
          <br /> tradition and tomorrow.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/85 mb-8">
          The Ismaili Centres stand as ambassadors of a faith that has always
          embraced pluralism, intellectual inquiry and the highest expressions of
          art and architecture. Linked by gardens, parks and reflecting pools —
          they make visible an Islam at peace with itself, with nature, and with
          the world it shares.
        </p>
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="h-px w-16 bg-gold/40" />
          <Logo size={32} spin />
          <div className="h-px w-16 bg-gold/40" />
        </div>
      </div>
    </section>
  );
}

function JamatkhanaSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const points = [
    { t: "Meaning", d: "Jamatkhana means \"a place where the community gathers\" — from Arabic jama'a (community) and Persian khana (house)." },
    { t: "Origins", d: "Jamatkhanas developed in the Indian subcontinent, used by Sufis, Bohras, and Ismailis as gathering places." },
    { t: "Chishti Tradition", d: "Chishti jamatkhanas included spaces for prayer, poetry recitations, and communal food." },
    { t: "Ismaili Use", d: "Today Ismailis use jamatkhanas for prayers, weddings, feasts, and community social events." },
    { t: "Ginans", d: "Ginans mention jamatkhanas as places of congregation — teaching unity, ethical conduct, virtues and proper behaviour." },
    { t: "Heritage", d: "A historic jamatkhana in Wardha, India, is famous for its decorative architecture." },
  ];
  return (
    <section id="jamatkhana" ref={ref} className="relative py-32 px-6 bg-deep-2/40 overflow-hidden">
      <Logo size={500} className="absolute -right-32 -top-20 opacity-[0.06] animate-rotate-slow" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="The Heart of Community"
          title="What is a Jamatkhana?"
          sub="More than a prayer hall — a living house of community, hospitality, learning and celebration."
        />
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 ${seen ? "animate-fade-up" : "opacity-0"}`}>
          {points.map((p, i) => (
            <div
              key={p.t}
              className="group p-8 rounded-2xl border border-border bg-background/70 backdrop-blur hover:border-crimson/50 hover:-translate-y-1 transition-all duration-500"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Logo size={28} />
                <div className="text-xs uppercase tracking-[0.3em] text-crimson">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground">{p.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FatimidSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const facts = [
    { n: "800", l: "Mosques counted in Cairo by Imam Al-Hakim, c.1012–13" },
    { n: "15", l: "Large congregational mosques noted by traveller Nasir-i Khusraw" },
    { n: "100,000", l: "Dinars Imam Al-Hakim paid to rescue the Mosque of Amr" },
    { n: "16", l: "Branches on the great silver lamp of the Mosque of Amr" },
  ];
  return (
    <section id="fatimid" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="Heritage · Fatimid Cairo"
          title="Mosques of the Fatimid Imams"
          sub="A golden age of architecture, learning and worship — when Cairo glowed under hundreds of lamps."
        />

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-5 mt-20 ${seen ? "animate-fade-up" : "opacity-0"}`}>
          {facts.map((f) => (
            <div key={f.l} className="p-6 rounded-2xl border border-gold/30 bg-deep-2/40 backdrop-blur text-center">
              <div className="font-serif text-4xl md:text-5xl bg-gold-gradient bg-clip-text text-transparent mb-2">{f.n}</div>
              <div className="text-xs text-muted-foreground leading-snug">{f.l}</div>
            </div>
          ))}
        </div>

        <div className={`grid md:grid-cols-2 gap-8 mt-16 ${seen ? "animate-fade-up" : "opacity-0"}`}>
          <article className="p-8 rounded-2xl border border-border bg-background/70 backdrop-blur">
            <Logo size={36} className="mb-4" />
            <h3 className="font-serif text-3xl mb-3 text-foreground">A City of Mosques</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under Fatimid rule, Cairo became a city of <em>masjids</em> and great
              congregational <em>jamis</em>. In 1012–13, Imam <span className="text-crimson font-medium">Al-Hakim</span> counted
              around <span className="text-gold font-medium">800 mosques</span> across the city.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The traveller and writer <em>Da'i Nasir-i Khusraw</em> later recorded
              fifteen large congregational mosques in Cairo alone.
            </p>
          </article>

          <article className="p-8 rounded-2xl border border-border bg-background/70 backdrop-blur">
            <Logo size={36} className="mb-4" />
            <h3 className="font-serif text-3xl mb-3 text-foreground">Saving the Mosque of Amr</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When the descendants of Amr ibn al-As fell into poverty and sought permission
              to pull down the mosque and sell its materials, Imam Al-Hakim instead bought
              it for <span className="text-gold font-medium">100,000 dinars</span> and lovingly restored it.
            </p>
            <ul className="text-muted-foreground leading-relaxed space-y-1 list-disc list-inside marker:text-crimson">
              <li>A silver lamp holder with sixteen branches</li>
              <li>Many colourful rugs across the prayer floor</li>
              <li>More than 100 lamps burning every night</li>
            </ul>
          </article>

          <article className="md:col-span-2 p-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-deep-2 to-background backdrop-blur">
            <Logo size={36} className="mb-4" />
            <h3 className="font-serif text-3xl mb-3 text-foreground">Worship & the Sessions of Wisdom</h3>
            <p className="text-muted-foreground leading-relaxed">
              Muslims performed <em>salat</em> in these mosques using the Shia version of the
              <em> adhan</em>, and special Qur'anic passages important to Shia Muslims were
              recited. Beyond the daily prayer, Ismailis also attended the
              <span className="text-crimson font-medium"> majalis al-hikma</span> —
              the <em>"sessions of wisdom"</em> — religious gatherings where esoteric
              knowledge, philosophy and ethics were taught.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function CreatorSection() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section id="creator" ref={ref} className="py-32 px-6 bg-deep-2/30 relative overflow-hidden">
      <Logo size={400} className="absolute -left-32 -bottom-20 opacity-[0.05] animate-rotate-slow" />
      <div className={`max-w-5xl mx-auto ${seen ? "animate-fade-up" : "opacity-0"}`}>
        <SectionHeader
          eyebrow="The Architect"
          title="Creator of this Hub"
          sub="Bridging technology and tradition to celebrate the global Ismaili heritage."
        />
        
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden border border-gold/30 shadow-card">
              <img 
                src={creatorPhoto} 
                alt="Ayaan - Creator" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-serif text-3xl">Ayaan</div>
                <div className="text-gold text-sm tracking-[0.2em] uppercase">Digital Visionary</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-serif text-4xl text-foreground">A Journey of Faith & Code</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This platform was built with a vision to showcase the architectural 
              and spiritual brilliance of the Ismaili Centres. By combining 
              modern web technologies with the timeless aesthetics of our heritage, 
              we aim to create a space for discovery, reflection, and community.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 rounded-xl border border-border bg-background/50">
                <div className="text-gold mb-2 font-serif text-2xl">Design</div>
                <div className="text-sm text-muted-foreground">Crafting immersive experiences that resonate with the soul.</div>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background/50">
                <div className="text-gold mb-2 font-serif text-2xl">Legacy</div>
                <div className="text-sm text-muted-foreground">Preserving and presenting our history for the digital age.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
