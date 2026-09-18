import Header from "./Header";
import LandingHero from "./LandingHero";
import LandingFitur from "./LandingFitur";
import LandingTentang from "./LandingTentang";
import LandingCta from "./LandingCta";
import LandingFooter from "./LandingFooter";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col scroll-smooth transition-colors duration-200">
            <Header />
            <LandingHero />
            <LandingFitur />
            <LandingTentang />
            <LandingCta />
            <LandingFooter />
        </div>
    );
};

export default LandingPage;