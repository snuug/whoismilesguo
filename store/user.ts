import { defineStore } from "pinia";
import { useGlobalStore } from "./global";

interface AuthState {
  userSession: any;
  userJwt: any;
  jwtExpirationTime: number;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    userSession: null,
    userJwt: null,
    jwtExpirationTime: 0,
  }),
  persist: true,
  actions: {
    // This is used to handle the OAuth login
    handleOAuth: async function ( 
      provider: string,
      redirectUrl = "/",
      errorRedirectUrl = "/login"
    ):Promise<void> {
      const { account } = useAppwrite();
      const globalStore = useGlobalStore();
      try {
        const session = account.createOAuth2Session(
          provider,
          useRuntimeConfig().public.siteUrl + redirectUrl,
          useRuntimeConfig().public.siteUrl + errorRedirectUrl
        );
        this.userSession = session;
      } catch (error: any) {
        globalStore.setError({
          show: true,
          message: error.message,
        });
      }
    },
    // This is used to get the user's session
    async loadSession(): Promise<void> { 
      const { account } = useAppwrite();
      const globalStore = useGlobalStore();
      try {
        const session = await account.get();
        this.userSession = session;
        await this.createJWT();
        // Check if the OAuth2 session is about to expire (e.g. in the next minute)
        const expiresIn = (new Date(this.userSession.providerAccessTokenExpiry).getTime() - new Date().getTime()) / 1000;
        if (expiresIn < 60) {
          // Session has expired, refresh it
          await account.updateSession(session.$id);
          this.userSession = await account.get();
          await this.createJWT();
        }
        // Check if the JWT is about to expire (e.g. in the next minute)
        this.jwtExpirationTime = Date.now() + 15 * 60 * 1000;
        if ((this.jwtExpirationTime - Date.now())< 60) {
          // If it is about to expire, refresh the JWT
          await this.createJWT();
          this.jwtExpirationTime = Date.now() + 15 * 60 * 1000;
        }
      } catch (error: any) {
        this.userSession = null;
        globalStore.setError({
          show: false,
          message: "Error loading session: " + error.message,
        });
      }
    },
    // This is used to get a JWT for the user to use in the API
    async createJWT() { 
      const { account } = useAppwrite();
      const globalStore = useGlobalStore();
      try {
        const { jwt } = await account.createJWT();
        this.userJwt = jwt;

        // Check if the JWT is about to expire (e.g. in the next minute)
        this.jwtExpirationTime = Date.now() + 15 * 60 * 1000;
        if ((this.jwtExpirationTime - Date.now())< 60) {
          // If it is about to expire, refresh the JWT
          await this.createJWT();
          this.jwtExpirationTime = Date.now() + 15 * 60 * 1000;
        }
      } catch (error: any) {
        this.userSession = null;
        globalStore.setError({
          show: false,
          message: "Error creating JWT: " + error.message,
        });
      }
    },
    // This is used to log the user out
    async logout(): Promise<void> { 
      const { account } = useAppwrite();
      const globalStore = useGlobalStore();
      try {
        await account.deleteSession("current");
        this.userSession = null;
        console.log("logout");
      } catch (error: any) {
        // Check if the error is because of a missing scope
        if (error.code === 401 && error.message.includes("missing scope")) {
          this.userSession = null;
          globalStore.setError({
            show: false,
            message: "User session is expired or invalid, logging out..." + error.message,
          });        
        } else {
          globalStore.setError({
            show: false,
            message: error.message,
          });
        }
      }
    },
  },
  // a getter to check if the user is logged in
  getters: {
    isLoggedIn(): boolean {
      return !!this.userSession;
    }
  }
});