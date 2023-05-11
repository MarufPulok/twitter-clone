import Comment from "../components/Comment";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import RightBar from "../components/RightBar";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import connect from "../db/connect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import Signup from "../components/Signup";
import Login from "../components/Login";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EditProfile from "../components/EditProfile";
import EditPost from "../components/EditPost";
import CommentReply from "../components/CommentReply";
import Followers from "../components/Followers";
import Following from "../components/Following";
import CreateRetweet from "../components/CreateRetweet";

//framer motion(later)

const Home = ({ newsResults }) => {
  const { data: session } = useSession();
  console.log(session);
  let router = useRouter();
  return (
    <>
      {router.query.modal === "signup" && (
        <Modal>
          <Signup />
        </Modal>
      )}

      {router.query.modal === "login" && (
        <Modal>
          <Login />
        </Modal>
      )}
      {router.query.modal === "delete" && (
        <Modal>
          <DeleteConfirmation />
        </Modal>
      )}
      {router.query.modal === "comment" && (
        <Modal>
          <Comment />
        </Modal>
      )}
      {router.query.modal === "editProfile" && (
        <Modal>
          <EditProfile />
        </Modal>
      )}

      {router.query.modal === "editPost" && (
        <Modal>
          <EditPost />
        </Modal>
      )}

      {router.query.modal === "reply" && (
        <Modal>
          <CommentReply />
        </Modal>
      )}

      {router.query.modal === "followers" && (
        <Modal>
          <Followers />
        </Modal>
      )}
      {router.query.modal === "following" && (
        <Modal>
          <Following />
        </Modal>
      )}
      {router.query.modal === "retweet" && (
        <Modal>
          <CreateRetweet />
        </Modal>
      )}
      <div
        style={{
          width: "70%",
        }}
      >
        <main className="mainMenu">
          <Sidebar />

          <Feed />

          {session ? (
            <Widgets newsResults={newsResults} />
          ) : (
            <>
              <RightBar />
            </>
          )}
        </main>

        {/* <CustomLogin/> */}
        <footer>
          {session ? null : (
            <>
              <Footer />
            </>
          )}
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  await connect();
  // const res = await fetch(
  //   `https://saurav.tech/NewsAPI/top-headlines/category/business/in.json`
  // );
  // const newsResults = await res.json();

  return {
    props: {
      // newsResults: newsResults.articles,
    },
  };
}

export default Home;
