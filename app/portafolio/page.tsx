import Navbar from "@/components/ui/Navbar"

const works = [
  {
    title: "True Hughes BBQ",
    image: "/portafolio/truehughesbbq.png", 
    description: "From our family to yours, we hope you enjoy every bite!",
    link: "https://truehughesbbq.com",
    linkLabel: "truehughesbbq.com",
  },
  // Add more works here
];

export default function PortfolioPage() {
  const work = works[0]; // Only show the first work for now
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Navbar />
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-2 md:px-8">
        <div className="w-full flex flex-col items-start md:items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-alioshaBlack drop-shadow-lg">
            {work.title}
          </h1>
          <p className="text-lg text-alioshaGrayLight mb-4">
            {work.description}
          </p>
        </div>
        <div className="relative w-full max-w-[1400px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border-2 border-alioshaBlack">
          <iframe
            src={work.link}
            title={work.title}
            className="w-full h-full absolute inset-0 border-0 rounded-xl"
            allowFullScreen
          />
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 bg-white/90 border-2 border-alioshaBlue text-alioshaBlue font-bold text-xl md:text-2xl px-6 py-3 md:px-8 md:py-4 rounded-3xl shadow-lg flex items-center gap-2 transition-all duration-200 hover:bg-alioshaBlue hover:text-white hover:scale-105"
            style={{ textDecoration: "none" }}
          >
            {work.linkLabel}
            <span className="ml-2 text-2xl md:text-3xl">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
