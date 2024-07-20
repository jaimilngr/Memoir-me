import { Appbar } from "./Appbar";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import ErrorAnimation from "../assets/images/Error.json";

export function PopUp() {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="mt-0 md:mt-8 p-4 text-center flex flex-col items-center">
          <div className="w-80 h-50 flex items-center justify-center">
            <Lottie
              animationData={ErrorAnimation}
            />
          </div>
          <div className="text-xl md:text-2xl font-semibold mb-4">
            We understand your interest, but please
          </div>
          <div className="text-xl md:text-2xl font-bold">
            <Link
              to="/signin"
              className="text-blue-500 hover:text-blue-700"
            >
              Sign in Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
