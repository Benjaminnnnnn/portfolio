import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "./components";

const App = () => {
  // const [active, setActive] = useState("");

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     const scrollY = window.scrollY;
  //     let current = "";
  //     const spans = document.querySelectorAll("span[id]");
  //     spans.forEach((span) => {
  //       const id = span.getAttribute("id");
  //       const section =
  //         id === "contact" ? span.parentNode.parentNode : span.parentNode;
  //       if (scrollY >= section.offsetTop) {
  //         current = id;
  //       }
  //     });

  //     if (active !== current) {
  //       console.log(current, "| ", active);
  //       setActive(current);
  //     }
  //     // console.log(active, " | ", current);
  //   };

  //   document.addEventListener("scroll", handleScroll);
  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar></Navbar>
          <Hero></Hero>
        </div>

        <About></About>
        <Experience></Experience>
        <Tech></Tech>
        <Works></Works>
        {/* <Feedbacks></Feedbacks> */}

        <div className="relative z-0">
          <Contact></Contact>
          <StarsCanvas></StarsCanvas>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
