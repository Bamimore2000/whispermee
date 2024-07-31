import Link from "next/link";
import { getUserbyUsername } from "../../actions/index";
import AnonymousPage from "../../components/AnonymousPage";
const page = async (params) => {
  const username = params.params.anonymous;
  try {
    const userExists = await getUserbyUsername(username);
    if (!userExists) {
      return (
        <div className="mx-auto  h-[100vh] w-[100vw] grid place-content-center max-w-[1000px]">
          User does not exist or link has expired
          <Link className="block text-center bg-slate-400 text-white" href="/">
            Go home
          </Link>
        </div>
      );
    }
    return <AnonymousPage user={userExists} />;
  } catch (error) {
    console.log(error.message);
  }
};
export default page;
