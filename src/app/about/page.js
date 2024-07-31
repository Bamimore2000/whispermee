import NavBarPublic from "../components/NavBarPublic";
import { founders } from "../../utils/founder-info";
import FounderCard from "../components/FounderCard";

const About = () => {
  return (
    <main>
      <div className="wrapper-about">
        <NavBarPublic />
        <section className="mx-auto w-[85%] max-w-[1300px]">
          <div className="md:w-2/3">
            <h1 className="text-3xl my-6">About Us</h1>
            <p>
              In today&apos;s digital age, privacy and anonymity are more
              important than ever. At Whisper Me, we believe in the power of
              true anonymity, where your thoughts, ideas, and interactions can
              flourish without the fear of judgment or exposure.
            </p>
            <div className="founders">
              <h2 className="text-2xl my-6">Meet the Founders</h2>
              <div className="wrapper-founder md:flex md:gap-16">
                {founders.map((founder) => {
                  return <FounderCard key={founder.name} {...founder} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
