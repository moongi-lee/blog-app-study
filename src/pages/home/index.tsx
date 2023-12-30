import Header from "components/header";
import PostList from "components/PostList";
import Footer from "components/Footer";
import Carousel from "../../components/Carousel";
export default function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <PostList />
      <Footer />
    </div>
  );
}
