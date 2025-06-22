import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}



// One‑shot prompt (kept from previous step)
// export const askGemini = (prompt) =>
//   axios.post("/api/ai", { prompt }).then((r) => r.data.text);

// // 🔹 Conversational helper
// export const askGeminiChat = (messages) =>
//   axios.post("/api/ai-chat", { messages }).then((r) => r.data.text);

// export const askGemini = async (prompt) =>
//   axios.post("/api/ai", { prompt }).then((res) => res.data.text);



// fetchAiChatHistory
export const fetchAiChatHistory = async () => {
  const res = await fetch("/api/ai/chat", {
    method: "GET",
    credentials: "include", // 🟢 important for cookies / auth
  });
  if (!res.ok) throw new Error("Failed to fetch AI chat history");
  return res.json();
};

// askGeminiChat
export const askGeminiChat = async (prompt) => {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    credentials: "include", // 🟢 important
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Failed to get AI response");
  return res.json();
};

//settings

// ✅ REPLACE this in userApi.js
export const updateUserProfile = async (data) => {
  const res = await axiosInstance.put("/users/update-profile", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await axiosInstance.get("/users/profile"); // ✅ no ID
  return res.data;
};


