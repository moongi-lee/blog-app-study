import Profile from "components/Profile";
import Footer from "components/Footer";
import Header from "components/header";
import PostList from "components/PostList";

export default function ProfilePage() {
  return (
      <>
        <Header/>
        <Profile/>
        <PostList hasNavigation={false} />
        <Footer/>
      </>
  )
}