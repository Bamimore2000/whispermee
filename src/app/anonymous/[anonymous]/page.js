import { getUserbyUsername } from "../../actions/index";
import AnonymousPage from "../../components/AnonymousPage";
const page = async (params) => {
  const username = params.params.anonymous;
  try {
    const userExists = await getUserbyUsername(username);
    return <AnonymousPage user={userExists} />;
  } catch (error) {
    console.log(error.message);
  }
};
export default page;
