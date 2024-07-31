import Image from "next/legacy/image";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { socialSignIn } from "../../actions/index";

const Register = async () => {
  return (
    <main className="sign-in h-[100vh]">
      <div className="main-wrapper mt-[15px] md:mt-0 flex flex-col md:p-5 md:w-[98%] md:flex-row items-center gap-6 h-full">
        <section className="first basis-2/6 md:basis-2/5 h-[100%] w-full flex items-end">
          <div className="image-container h-full w-full"></div>
        </section>
        <section className="second basis-4/6 md:basis-3/5 m-[10px] p-5  w-full">
          <div className="wrapper">
            <section className="title mb-10 leading-loose">
              <h1 className="text-3xl mb-4">Get Started</h1>
              <h3 className="text-xl">Simple, Secure and Anonymous</h3>
            </section>
            <section className="providers ">
              <form
                action={socialSignIn}
                className="flex flex-col gap-4 md:w-[50%]"
              >
                <button type="submit" name="action" value="google">
                  <div className="google border gap-2 border-solid border-black flex items-center justify-center p-3">
                    <FaGoogle />
                    Google
                  </div>
                </button>
                <button type="submit" name="action" value="twitter">
                  <div className="twitter border gap-2 border-solid border-black justify-center items-center flex p-3">
                    <FaTwitter />
                    Twitter
                  </div>
                </button>
                <button type="submit" name="action" value="instagram">
                  <div className="instagram border gap-2 border-solid border-black justify-center items-center flex p-3">
                    <FaInstagram />
                    Instagram
                  </div>
                </button>
                <button type="submit" name="action" value="facebook">
                  <div className="facebook border gap-2 border-solid border-black justify-center items-center flex p-3">
                    <FaFacebook />
                    Facebook
                  </div>
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
