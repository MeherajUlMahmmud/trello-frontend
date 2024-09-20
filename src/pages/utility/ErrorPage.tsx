import { dashboardRoute } from "@/utils/app_routes";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-4">
          <span>404</span> Page Not Found
        </h2>
        <h2 className="text-xl font-normal mt-4 text-red-500">
          Sorry, the page you are looking for does not exist.
        </h2>
        <h3 className="text-xl font-normal mt-4">
          You can always go back to the
          <a href={dashboardRoute} className="underline font-bold ml-1 scale-110">
            Dashboard
          </a>.
        </h3>
      </div>
    </>
  );
};

export default ErrorPage;
