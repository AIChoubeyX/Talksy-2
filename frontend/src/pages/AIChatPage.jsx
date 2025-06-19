// // import { CopilotChat } from "@copilotkit/react-ui";

// // const AIChatPage = () => {
// //   return (
// //     <div className="p-4 max-w-4xl mx-auto">
// //       <h2 className="text-xl font-bold mb-4">Talksy AI Chat</h2>
// //       <CopilotChat
// //         instructions="You are a helpful assistant for Talksy users."
// //         labels={{
// //           title: "Talksy AI Chat",
// //           initial: "Ask me anything!",
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export default AIChatPage;


// import { CopilotChat } from "@copilotkit/react-ui";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchAiChatHistory, askGeminiChat } from "../lib/api"; 
// import { useEffect } from "react";

// const AIChatPage = () => {
//   const queryClient = useQueryClient();

//   // ✅ Fetch chat history for the logged-in user
//   const { data: history = [], refetch } = useQuery({
//     queryKey: ["aiChatHistory"],
//     queryFn: fetchAiChatHistory,
//   });

//   // ✅ Mutation to send user prompt and receive assistant reply
//   const mutation = useMutation({
//     mutationFn: askGeminiChat,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["aiChatHistory"]); // auto refresh history
//     },
//   });

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Talksy AI Chat</h2>
//       <CopilotChat
//         instructions="You are a helpful assistant for Talksy users."
//         labels={{
//           title: "Talksy AI Chat",
//           initial: "Ask me anything!",
//         }}
//         chatHistory={history.map((msg) => ({
//           role: msg.role,
//           content: msg.content,
//         }))}
//         onSendMessage={async (message) => {
//           await mutation.mutateAsync(message); // send message to backend
//         }}
//       />
//     </div>
//   );
// };

// export default AIChatPage;


import { CopilotChat } from "@copilotkit/react-ui";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAiChatHistory, askGeminiChat } from "../lib/api"; 
import useAuthUser from "../hooks/useAuthUser";
import { useEffect } from "react";

const AIChatPage = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser(); // 🟢 get current user

  // ✅ Fetch chat history
  const { data: history = [], refetch } = useQuery({
    queryKey: ["aiChatHistory", authUser?._id], // 🟢 depend on user ID
    queryFn: fetchAiChatHistory,
    enabled: !!authUser, // wait until user is loaded
  });

  const mutation = useMutation({
    mutationFn: askGeminiChat,
    onSuccess: () => {
      queryClient.invalidateQueries(["aiChatHistory", authUser?._id]); // 🟢 invalidate user-specific cache
    },
  });

  // Optional: Refetch history when user changes
  useEffect(() => {
    if (authUser?._id) {
      queryClient.invalidateQueries(["aiChatHistory", authUser._id]);
    }
  }, [authUser, queryClient]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Talksy AI Chat</h2>
      <CopilotChat
        instructions="You are a helpful assistant for Talksy users."
        labels={{
          title: "Talksy AI Chat",
          initial: "Ask me anything!",
        }}
        chatHistory={history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))}
        onSendMessage={async (message) => {
          await mutation.mutateAsync(message); // send to backend
        }}
      />
    </div>
  );
};

export default AIChatPage;

