import {appwriteCredentials, client, account, database, bucket} from "./appwriteConfig";
import { ID } from "appwrite";

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
}

const blogService = new BlogService()
export default blogService;