import { CopilotPopup } from "@copilotkit/react-ui";

const AIChatPopup = () => {
  return (
    <CopilotPopup
      instructions="You're an assistant helping the user inside the Talksy app. Be helpful and clear."
      labels={{
        title: "Talksy Assistant",
        initial: "Need help?",
      }}
    />
  );
};

export default AIChatPopup;
