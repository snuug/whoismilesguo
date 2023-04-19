import { Client, Account, Teams, Functions, Databases } from "appwrite";
const config = useRuntimeConfig();

const client = new Client();
client.setEndpoint(config.public.appwrite.endpoint).setProject(config.public.appwrite.project);

const team = new Teams(client);
const account = new Account(client);
const functions = new Functions(client);
const databases = new Databases(client);

export { client, account, team, functions, databases };
