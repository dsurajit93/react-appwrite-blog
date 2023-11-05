import { Client, Account, Databases, Storage } from "appwrite"

export const appwriteCredentials = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabasetId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectiontId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export const client = new Client()
client
    .setEndpoint(appwriteCredentials.appwriteUrl)
    .setProject(appwriteCredentials.appwriteProjectId)

// export default {appwriteCredentials, client}
export const account = new Account(client)
export const database = new Databases(client)
export const bucket = new Storage(client)
