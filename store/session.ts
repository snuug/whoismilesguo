// import { defineStore } from "pinia";

// interface userSession {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   status: string;
// }

// export const useSessionStore = defineStore("session-store", {
//   state: (): userSession => {
//     return {
//       id: "",
//       name: "",
//       email: "",
//       avatar: "",
//       status: "",
//     };
//   },
//   actions: {
//     async handleOAuth(provider: string, redirectUrl: string, errorRedirectUrl: string) {
//       const { account } = useAppwrite();
//       const runtimeConfig = useRuntimeConfig();
//       const session = account.createOAuth2Session(
//         provider,
//         runtimeConfig.public.siteUrl + redirectUrl,
//         runtimeConfig.public.siteUrl + errorRedirectUrl
//       );
//       this.id = session.$id;
//       this.name = session.name;
//       this.email = session.email;
//       this.avatar = session.avatar;
//       this.status = session.status;
//     },
//   },
//   getters: {
//     getUserSession: (state: UserSession) => state,
//     isAuthenticated: (state: UserSession) => !!state.id,
//   },
// });
