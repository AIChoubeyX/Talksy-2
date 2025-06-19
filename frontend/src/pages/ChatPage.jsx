// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   Channel,
//   ChannelHeader,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import toast from "react-hot-toast";

// import ChatLoader from "../components/ChatLoader";
// import CallButton from "../components/CallButton";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//   const { id: targetUserId } = useParams();

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { authUser } = useAuthUser();

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser, // this will run only when authUser is available
//   });

//   useEffect(() => {
//     const initChat = async () => {
//       if (!tokenData?.token || !authUser) {
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("Initializing stream chat client...");
        
//         // Debug the token
//         console.log("Token data:", tokenData);
//         console.log("Auth user:", authUser._id);

//         // Validate token before using it
//         if (typeof tokenData.token !== 'string') {
//           throw new Error(`Invalid token type: expected string, got ${typeof tokenData.token}`);
//         }

//         const client = StreamChat.getInstance(STREAM_API_KEY);

//         // Check connection state
//         console.log("Current client state:", {
//           userID: client.userID,
//           connectionState: client.wsConnection?.isConnecting,
//           isHealthy: client.wsConnection?.isHealthy
//         });

//         // Check if there's already a connected user and it's a different user
//         if (client.userID && client.userID !== authUser._id) {
//           console.log("Disconnecting different user:", client.userID);
//           await client.disconnectUser();
//         }

//         // Only connect if not already connected as the same user
//         if (!client.userID || client.userID !== authUser._id) {
//           console.log("Connecting user:", authUser._id);
//           await client.connectUser(
//             {
//               id: authUser._id,
//               name: authUser.fullName,
//               image: authUser.profilePic,
//             },
//             tokenData.token
//           );
//         } else {
//           console.log("User already connected:", client.userID);
//         }

//         const channelId = [authUser._id, targetUserId].sort().join("-");

//         const currChannel = client.channel("messaging", channelId, {
//           members: [authUser._id, targetUserId],
//         });

//         await currChannel.watch();

//         setChatClient(client);
//         setChannel(currChannel);
//       } catch (error) {
//         console.error("Error initializing chat:", error);
//         console.error("Error details:", error.message);
//         toast.error("Could not connect to chat. Please try again.");
        
//         // Reset states on error
//         setChatClient(null);
//         setChannel(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();
//   }, [tokenData, authUser, targetUserId]);

//   // Cleanup effect to disconnect when component unmounts or dependencies change
//   useEffect(() => {
//     return () => {
//       if (chatClient) {
//         console.log("Cleaning up chat client...");
//         chatClient.disconnectUser().catch((error) => {
//           console.error("Error disconnecting user:", error);
//         });
//       }
//     };
//   }, [chatClient]);

//   // Alternative: Reset states when key dependencies change
//   useEffect(() => {
//     if (chatClient && (tokenData || authUser || targetUserId)) {
//       // Reset loading state when dependencies change
//       setLoading(true);
//     }
//   }, [tokenData?.token, authUser?._id, targetUserId]);

//   const handleVideoCall = () => {
//     if (channel) {
//       const callUrl = `${window.location.origin}/call/${channel.id}`;

//       channel.sendMessage({
//         text: `I've started a video call. Join me here: ${callUrl}`,
//       });

//       toast.success("Video call link sent successfully!");
//     }
//   };

//   if (loading || !chatClient || !channel) return <ChatLoader />;

//   return (
//     <div className="h-[93vh]">
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className="w-full relative">
//             <CallButton handleVideoCall={handleVideoCall} />
//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//           </div>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };

// export default ChatPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

// ✅ Read API Key from env
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!STREAM_API_KEY) {
        toast.error("Missing Stream API Key. Please check your .env file.");
        console.error("❌ STREAM_API_KEY is missing. Check your .env setup.");
        setLoading(false);
        return;
      }

      if (!tokenData?.token || !authUser) {
        setLoading(false);
        return;
      }

      try {
        console.log("👉 Initializing Stream Chat client...");
        console.log("📦 API Key:", STREAM_API_KEY);
        console.log("👤 Auth User:", authUser._id);
        console.log("🔑 Token:", tokenData.token);

        if (typeof tokenData.token !== "string") {
          throw new Error(
            `Invalid token type: expected string, got ${typeof tokenData.token}`
          );
        }

        const client = StreamChat.getInstance(STREAM_API_KEY);

        if (client.userID && client.userID !== authUser._id) {
          console.log("🔄 Disconnecting previously connected user:", client.userID);
          await client.disconnectUser();
        }

        if (!client.userID || client.userID !== authUser._id) {
          console.log("🔗 Connecting user:", authUser._id);
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        } else {
          console.log("✅ Already connected as:", client.userID);
        }

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("❌ Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
        setChatClient(null);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  useEffect(() => {
    return () => {
      if (chatClient) {
        console.log("🔌 Cleaning up chat client...");
        chatClient.disconnectUser().catch((error) => {
          console.error("❌ Error disconnecting user:", error);
        });
      }
    };
  }, [chatClient]);

  useEffect(() => {
    if (chatClient && (tokenData || authUser || targetUserId)) {
      setLoading(true);
    }
  }, [tokenData?.token, authUser?._id, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;

