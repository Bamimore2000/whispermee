import { auth } from "../../auth";
import { getUserFromDb } from "../../utils/db";
import DashboardComponent from "../components/DashboardComponent";

const Dashboard = async () => {
  const session = await auth();
  const { name, email } = session?.user;
  const { username } = await getUserFromDb(email);
  return (
    <DashboardComponent
      name={name}
      email={email}
      username={username}
    ></DashboardComponent>
  );
};
export default Dashboard;
