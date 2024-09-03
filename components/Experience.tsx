import { workExperience } from "@/data";
import { Button } from "./ui/moving-border";

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <h1 className="heading">
        A summary of my
        <span className="text-purple"> Work Experience</span>
      </h1>
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card, index) => (
          <Button
            key={index}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1rem"
            className="p-4 bg-black-100"
            borderClassName="h-20 w-20 opacity-[0.8] bg-[radial-gradient(#4e4e94_40%,transparent_60%)]"
            disabled
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img src={card.thumbnail} alt={card.thumbnail} className="lg:w-32 md:w-20 w-16" />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;