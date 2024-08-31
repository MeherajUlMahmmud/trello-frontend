import "../../styles/errorPage.scss";
import { dashboardRoute } from "../../utils/app_routes";

const ErrorPage = () => {
  return (
    <>
      <div className="errorPage">
        <h2 className="errorPage__title">
          <span>404</span> Page Not Found
        </h2>
        <h2 className="errorPage__subtitle" style={{
          fontSize: "1.5rem",
          fontWeight: "normal",
          marginTop: "1rem",
          color: "red"
        }}>
          Sorry, the page you are looking for does not exist.
        </h2>
        <h3 className="errorPage__subtitle">
          You can always go back to the <a href={dashboardRoute}
            className="underline"
            style={{
              scale: "1.2",
              fontWeight: "bold",
              marginLeft: "0.1rem"
            }}
          >
            Dashboard
          </a>.
        </h3>
      </div>
    </>
  );
};

export default ErrorPage;
