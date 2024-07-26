import { auth } from "../../../auth";
import { getUser } from "../../actions";
const Analytics = async () => {
  const session = await auth();
  const { email } = session.user;
  const user = await getUser(email);
  const messages = user?.messages;
  console.log("messages:", user);
  return (
    <main>
      <div className="home-wrapper w-[90%] md:max-w-[640px] mx-auto mt-10">
        <h1 className="text-3xl tracking-wide"> Your Analytics</h1>
        <p className="text-base w-2/3">
          Get a quick snapshot of your engagement metrics
        </p>
        <div className="mt-12 grid grid-cols-2 gap-8">
          <article className="bg-[#F5F5F5] h-[150px] p-5">
            <p>Total messages recieved</p>
            <span className="text-3xl mt-6 block">{messages.length}</span>
          </article>
          <article className="bg-[#F5F5F5] h-[150px] p-5">
            <p>Number of replies</p>
            <span className="text-3xl mt-6 block">0</span>
          </article>
          <article className="bg-[#F5F5F5] h-[150px] p-5">
            <p>Total number of views</p>
            <span className="text-3xl mt-6 block">0</span>
          </article>
        </div>
      </div>
    </main>
  );
};
export default Analytics;
