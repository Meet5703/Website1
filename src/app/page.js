import Vacancy from "@/components/vacancyAnimation/Vacancy";
import CrouselComp from "@/components/Crousel/Crousel";
import About from "@/components/About/About";
import CarouselAds from "@/components/Companycrousel/crousel";

const Home = () => {
  return (
    <>
      <Vacancy title1="Apply Now      Apply Now       Apply Now     Apply Now      Apply Now       Apply Now      " />
      <CrouselComp />
      <h1 className="text-center mt-4 uppercase font-bold font-monospace  text-3xl">
        Vacancy Are For
      </h1>
      <Vacancy title1="Lead Actor   Comedian   Singer    Dancer     Side Actor    Sideactoress     Director     Lead Actoress" />
      <About />
      <CarouselAds />
    </>
  );
};

export default Home;
