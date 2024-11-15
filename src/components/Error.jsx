import { Link, useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();
  const errorType = location.state?.errorType || "404";
  const errorMessage =
    errorType === "bad-request" ? "Bad Request" : "Page Not Found";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-900">
      <h1 className="text-6xl font-bold mb-4">
        {errorType === "bad-request" ? "400" : "404"}
      </h1>
      <p className="text-2xl mb-8">{errorMessage}</p>
      <p className="mb-4">
        {errorType === "bad-request"
          ? "The request could not be processed due to a client error."
          : "The page you are looking for doesn’t exist or an error occurred."}
      </p>
      <Link
        to="/"
        className="px-6 py-3 mt-4 text-lg font-semibold text-white bg-Quaternary rounded hover:bg-teal-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
