import {appwriteCredentials, client, account, database, bucket} from "./appwriteConfig";
import { ID, Query } from "appwrite";

class BlogService{

    async createBlog(title, slug, content, featured_image, user_id){
        try {
            return await database.createDocument(
                appwriteCredentials.appwriteDatabasetId,
                appwriteCredentials.appwriteCollectiontId,
                slug, {
                    title,
                    slug,
                    content,
                    featured_image,
                    user_id
                }
            )
        } catch (error) {
            console.log("Appwrite Create Blog Error: ",error);
            throw error
        }
    }

    async getBlogs(){
        try {
            return await database.listDocuments(
                appwriteCredentials.appwriteDatabasetId,
                appwriteCredentials.appwriteCollectiontId,
                [
                    Query.equal("published", true),
                    Query.orderDesc("$createdAt")
                ]
            )
        } catch (error) {
            throw error
        }
    }

    async getBlog(id){
        try {
            return await database.getDocument(
                appwriteCredentials.appwriteDatabasetId,
                appwriteCredentials.appwriteCollectiontId,
                id
            )
        } catch (error) {
            throw error
        }
    }

    async getUsersBlog(userId){
        try {
            return await database.listDocuments(
                appwriteCredentials.appwriteDatabasetId,
                appwriteCredentials.appwriteCollectiontId,
                [
                    Query.equal("user_id", userId),
                    Query.orderDesc("$createdAt")
                ]
            )
        } catch (error) {
            console.log("GetUser'sBlog Error: ", error);
            throw error
        }
    }


    // File Operations
    async fileUpload(file){
        try {
            return await bucket.createFile(
                appwriteCredentials.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite file upload error: ", error)
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return bucket.getFilePreview(
                appwriteCredentials.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
}

const blogService = new BlogService()
export default blogService;