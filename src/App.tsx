import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "./components";

const App = () => {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary text-ink">
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <header className="relative">
          <Navbar></Navbar>
        </header>
        <main id="main-content">
          <Hero></Hero>
          <About></About>
          <Education></Education>
          <Experience></Experience>
          <Tech></Tech>
          <Works></Works>
          {/* <Feedbacks></Feedbacks> */}
          <div className="relative z-0">
            <Contact></Contact>
            <StarsCanvas></StarsCanvas>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
