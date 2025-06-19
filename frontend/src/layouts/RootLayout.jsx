import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <CopilotKit  publicApiKey={import.meta.env.VITE_COPILOT_PUBLIC_API_KEY}>
      <Outlet /> {/* renders the current route's page component */}
    </CopilotKit>
  );
};

export default RootLayout;
