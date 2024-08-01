import Image from "next/legacy/image";
import Link from "next/link";
import { getUserbyUsername } from "../../actions/index";
import AnonymousPage from "../../components/AnonymousPage";
import NavBarPublic from "../../components/NavBarPublic";
const page = async (params) => {
  const username = params.params.anonymous;
  try {
    const userExists = await getUserbyUsername(username);
    if (!userExists) {
      return (
        <>
        <NavBarPublic/>
        <div className="mx-auto  h-[100vh] w-[100vw] max-w-[1000px]">
          <div className="wrapper grid place-items-center">
            <div className="image-wrapper relative h-[200px] w-[200px] text-center">
              <Image className="block" layout="fill" objectFit="cover" src="/clock.png"></Image>
            </div>
            <p>User does not exist or link has expired</p>
            <Link className="underline block mt-12" href="/">Go to home</Link>
          </div>
        </div>
        </>
        
      );
    }
    return <AnonymousPage user={userExists} />;
  } catch (error) {
    console.log(error.message);
  }
};
export default page;
