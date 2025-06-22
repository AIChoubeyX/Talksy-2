// import { Navigate, Route, Routes } from "react-router";

// import HomePage from "./pages/HomePage.jsx";
// import SignUpPage from "./pages/SignUpPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import NotificationsPage from "./pages/NotificationsPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import ChatPage from "./pages/ChatPage.jsx";
// import OnboardingPage from "./pages/OnboardingPage.jsx";
// // import AIChatPage from "./pages/AIChatPage";

// import { Toaster } from "react-hot-toast";

// import PageLoader from "./components/PageLoader.jsx";
// import useAuthUser from "./hooks/useAuthUser.js";
// import Layout from "./components/Layout.jsx";
// import { useThemeStore } from "./store/useThemeStore.js";

// const App = () => {
//   const { isLoading, authUser } = useAuthUser();
//   const { theme } = useThemeStore();

//   const isAuthenticated = Boolean(authUser);
//   const isOnboarded = authUser?.isOnboarded;

//   if (isLoading) return <PageLoader />;

//   return (
//     <div className="h-screen" data-theme={theme}>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout

//                  showSidebar={true}>
//                 <HomePage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar={true}>
//                 <NotificationsPage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/call/:id"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <CallPage />
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />

//         <Route
//           path="/chat/:id"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar={false}>
//                 <ChatPage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />

//         <Route
//           path="/onboarding"
//           element={
//             isAuthenticated ? (
//               !isOnboarded ? (
//                 <OnboardingPage />
//               ) : (
//                 <Navigate to="/" />
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//       </Routes>

//       <Toaster />
//     </div>
//   );
// };
// export default App;

import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnBoardingPage.jsx";
import AIChatPage from "./pages/AIChatPage.jsx"; // ✅ added AIChat page
import SettingsPage from "./pages/SettingsPage.jsx"; // ✅ added Settings page
import AITranslatePage from "./pages/AITranslatePage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

// ✅ CopilotKit Integration START
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
// ✅ CopilotKit Integration END
// import AITranslatePage from "./pages/AITranslatePage.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    // ✅ CopilotKit Integration START
    <CopilotKit publicApiKey={import.meta.env.VITE_COPILOT_PUBLIC_API_KEY}>
      {/* ✅ CopilotKit Integration END */}

      <div className="h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          //settings page
          <Route
            path="/settings"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <SettingsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          //ai translate page
          <Route path="/ai-translate" element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true} >
                <AITranslatePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
          
          <Route
            path="/ai-chat"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <AIChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
        </Routes>

        <Toaster />
      </div>

      {/* ✅ CopilotKit Integration END */}
    </CopilotKit>
  );
};

export default App;
