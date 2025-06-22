// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

// import { capitialize } from "../lib/utils";

// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   // useEffect(() => {
//   //   const outgoingIds = new Set();
//   //   if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//   //     outgoingFriendReqs.forEach((req) => {
//   //       outgoingIds.add(req.recipient._id);
//   //     });
//   //     setOutgoingRequestsIds(outgoingIds);
//   //   }
//   // }, [outgoingFriendReqs]);

//   useEffect(() => {
//   const outgoingIds = new Set();
//   if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//     outgoingFriendReqs.forEach((req) => {
//       // Add null check for req and req.recipient
//       if (req && req.recipient && req.recipient._id) {
//         outgoingIds.add(req.recipient._id);
//       }
//     });
//     setOutgoingRequestsIds(outgoingIds);
//   }
// }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">{user.fullName}</h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages with flags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

//                       {/* Action button */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         } `}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import {
//   CheckCircleIcon,
//   MapPinIcon,
//   UserPlusIcon,
//   UsersIcon,
// } from "lucide-react";

// import { capitialize } from "../lib/utils";
// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// // ✅ CopilotKit START – import the popup
// import AIChatPopup from "../components/AIChatPopup";
// // ✅ CopilotKit END

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   useEffect(() => {
//     const outgoingIds = new Set();
//     if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//       outgoingFriendReqs.forEach((req) => {
//         if (req?.recipient?._id) outgoingIds.add(req.recipient._id);
//       });
//       setOutgoingRequestsIds(outgoingIds);
//     }
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         {/* ---------- YOUR FRIENDS SECTION ---------- */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             Your Friends
//           </h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         {/* ---------- RECOMMENDED USERS SECTION ---------- */}
//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//                   Meet New Learners
//                 </h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your
//                   profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">
//                 No recommendations available
//               </h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">
//                             {user.fullName}
//                           </h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages with flags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && (
//                         <p className="text-sm opacity-70">{user.bio}</p>
//                       )}

//                       {/* Action button */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         }`}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>

//       {/* ✅ CopilotKit START – floating AI assistant */}
//       <AIChatPopup />
//       {/* ✅ CopilotKit END */}
//     </div>
//   );
// };

// export default HomePage;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

// import { capitialize } from "../lib/utils";

// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   // useEffect(() => {
//   //   const outgoingIds = new Set();
//   //   if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//   //     outgoingFriendReqs.forEach((req) => {
//   //       outgoingIds.add(req.recipient._id);
//   //     });
//   //     setOutgoingRequestsIds(outgoingIds);
//   //   }
//   // }, [outgoingFriendReqs]);

//   useEffect(() => {
//   const outgoingIds = new Set();
//   if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//     outgoingFriendReqs.forEach((req) => {
//       // Add null check for req and req.recipient
//       if (req && req.recipient && req.recipient._id) {
//         outgoingIds.add(req.recipient._id);
//       }
//     });
//     setOutgoingRequestsIds(outgoingIds);
//   }
// }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">{user.fullName}</h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages with flags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

//                       {/* Action button */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         } `}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import {
//   CheckCircleIcon,
//   MapPinIcon,
//   UserPlusIcon,
//   UsersIcon,
// } from "lucide-react";

// import { capitialize } from "../lib/utils";
// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// // ✅ AI assistant popup
// import AIChatPopup from "../components/AIChatPopup";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   useEffect(() => {
//     const outgoingIds = new Set();
//     if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//       outgoingFriendReqs.forEach((req) => {
//         if (req?.recipient?._id) outgoingIds.add(req.recipient._id);
//       });
//       setOutgoingRequestsIds(outgoingIds);
//     }
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         {/* ---------- YOUR FRIENDS SECTION ---------- */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             Your Friends
//           </h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         {/* ---------- RECOMMENDED USERS SECTION ---------- */}
//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//                   Meet New Learners
//                 </h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your
//                   profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">
//                 No recommendations available
//               </h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="size-16 rounded-full overflow-hidden">
//                           <img
//                             src={user.profilePic}
//                             alt={user.fullName}
//                             className="w-full h-full object-cover rounded-full"
//                           />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">
//                             {user.fullName}
//                           </h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages with flags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && (
//                         <p className="text-sm opacity-70">{user.bio}</p>
//                       )}

//                       {/* Action button */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         } `}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>

//       {/* ✅ AI Assistant Bubble – Persistent on all viewports */}
//       <AIChatPopup />
//     </div>
//   );
// };

// export default HomePage;


// /pages/HomePage.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { useUserProfile } from "../hooks/useUserProfile";   // ✅ NEW
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import AIChatPopup from "../components/AIChatPopup";

const HomePage = () => {
  /* ---------------------------------------------------------------------- */
  /* 1. React‑Query setup                                                    */
  /* ---------------------------------------------------------------------- */
  const queryClient = useQueryClient();

  // 🔹 Current user profile (auto‑refreshes when ["userProfile"] is invalidated)
  const { data: user, isLoading: loadingProfile } = useUserProfile();

  // 🔹 Friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // 🔹 Recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // 🔹 Outgoing friend requests
  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // 🔹 Send friend request mutation
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  /* ---------------------------------------------------------------------- */
  /* 2. Memoize outgoing IDs for quick look‑ups                              */
  /* ---------------------------------------------------------------------- */
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  useEffect(() => {
    const ids = new Set();
    if (outgoingFriendReqs?.length) {
      outgoingFriendReqs.forEach((req) =>
        req.recipient?._id ? ids.add(req.recipient._id) : null
      );
    }
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  /* ---------------------------------------------------------------------- */
  /* 3. Render                                                               */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* ---------- HEADER: Welcome + Avatar ---------- */}
        {loadingProfile ? (
          <div className="flex justify-center py-6">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic}
              alt={user.fullName}
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome, {user.fullName}
            </h1>
          </div>
        )}

        {/* ---------- YOUR FRIENDS SECTION ---------- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* ---------- RECOMMENDED USERS SECTION ---------- */}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((userRec) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(userRec._id);
                return (
                  <div
                    key={userRec._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="size-16 rounded-full overflow-hidden">
                          <img
                            src={userRec.profilePic}
                            alt={userRec.fullName}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {userRec.fullName}
                          </h3>
                          {userRec.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {userRec.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(userRec.nativeLanguage)}
                          Native: {capitialize(userRec.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {getLanguageFlag(userRec.learningLanguage)}
                          Learning: {capitialize(userRec.learningLanguage)}
                        </span>
                      </div>

                      {userRec.bio && (
                        <p className="text-sm opacity-70">{userRec.bio}</p>
                      )}

                      {/* Action */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(userRec._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* ✅ AI assistant bubble */}
      <AIChatPopup />
    </div>
  );
};

export default HomePage;

