import { permanentRedirect } from "next/navigation";

const Home = async () => {
  permanentRedirect("/movies/search");
};

export default Home;
