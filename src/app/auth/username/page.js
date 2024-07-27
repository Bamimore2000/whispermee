"use client";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkUserNameAvailability, getUser } from "../../actions";
import { useEffect, useState } from "react";
import NameResponse from "../../components/NameResponse";
import { submitUsername } from "../../actions";

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { email } = session?.user;
  useEffect(() => {
    const doSomething = async () => {
      console.log(email);
      const data = await getUser(email);
      if (data) {
        // check if the user has a username
        if (data?.username) {
          // since user has an email, redirect them to the dashboard
          router.push("/whisperme");
        }
      }
    };
    doSomething();
    return () => {
      console.log("clean up");
    };
  }, []);
  const [nameNotAvailable, setNameNotAvailable] = useState(true);
  const [responseStatus, setResponseStatus] = useState({
    color: "",
    message: "",
  });
  const [displayResponse, setDisplayResponse] = useState(false);

  console.log(session);

  // checks if the username is available
  const handleUsernameAvailabilty = async (e) => {
    let value = e.target.value;
    value = value.toLowerCase().trim().replace(/\s+/g, "");
    if (value) {
      setDisplayResponse(true);
    } else {
      setDisplayResponse(false);
      setNameNotAvailable(true);
      return;
    }

    if (value.length <= 3) {
      setResponseStatus({
        color: "red",
        message: "username is too short",
      });
      setDisplayResponse(true);
      setNameNotAvailable(true);
      return;
    }
    console.log(value);
    const response = await checkUserNameAvailability(value);

    if (response.success) {
      setResponseStatus({
        color: "green",
        message: `${value} is available`,
      });
      setNameNotAvailable(false);
    }
    if (response.error) {
      setResponseStatus({
        color: "red",
        message: `${value} is not available`,
      });
      setNameNotAvailable(true);
    }
    console.log(e.target.value);
  };
  // submits the available name
  const handleNameSubmit = async (e) => {
    const formData = new FormData(e.target);
    console.log();
    e.preventDefault();
    let username = formData.get("username"); // Get the value from the input element
    username = username.toLowerCase(); // Convert the value to lowercase
    username = username.trim(); // Remove leading and trailing whitespace
    username = username.replace(/\s+/g, ""); // Remove all remaining whitespace

    console.log(username);
    try {
      const response = await submitUsername(username, email);
      if (response.success) {
        router.push("/whisperme");
      } else {
        // throw new Error("There was a problem");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const hasUsername = async (email) => {};
  return (
    <main className="sign-in h-[100vh]">
      <div className="main-wrapper md:mt-0 flex flex-col md:p-5 md:w-[98%] md:flex-row items-center gap-6 h-full">
        <section className="first basis-2/6 md:basis-2/5 h-[100%] w-full flex items-end">
          <div className="image-container-username h-full w-full"></div>
        </section>
        <section className="second basis-4/6 md:basis-3/5 m-[10px]  p-5  w-full">
          <div className="wrapper">
            <section className="title mb-16">
              <h1 className="text-3xl mb-4">Choose a Username</h1>
              <h3 className="text-xl md:text-2xl">
                Simple, Secure and Anonymous
              </h3>
            </section>
            <section className="md:w-[50%]">
              <form onSubmit={handleNameSubmit}>
                <input
                  onChange={handleUsernameAvailabilty}
                  className="username-input w-full border-black border h-[40px] p-4"
                  placeholder="Jamesu45"
                  name="username"
                  type="text"
                />
                {displayResponse && (
                  <NameResponse
                    color={responseStatus.color}
                    message={responseStatus.message}
                  />
                )}

                <button
                  style={{
                    backgroundColor: nameNotAvailable ? "#414141" : "#262626",
                    cursor: nameNotAvailable ? "not-allowed" : "pointer",
                  }}
                  disabled={nameNotAvailable}
                  type="submit"
                  className="username-button flex justify-center  items-center gap-2 bg-[#262626] w-full text-white p-3 mt-16"
                >
                  Next
                  <FaGreaterThan />
                </button>
              </form>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Register;
