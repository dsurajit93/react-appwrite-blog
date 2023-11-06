import {appwriteCredentials, client, account, database} from "./appwriteConfig";
import { ID } from "appwrite";

class AuthService {
    async createAccount(credentails){
        console.log("createAccount Function Called", credentails);
        try{
            const userAccount = await account.create(
                ID.unique(),
                credentails.email,
                credentails.password,
                credentails.name,
            )
            if(userAccount){
                return userAccount
            } else {
                return null
            }
        } catch(error){
            console.log(error)
            throw error
        }
    }

    async login(credentails){
        console.log("login Function Called", credentails)
        try {
            let session =  await account.createEmailSession(credentails.email, credentails.password)
            let user = await account.get()
            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await account.get();
        } catch (error){
            // console.log('getCurrentUser: ',error);
            throw error
        }
    }

    async logout(){
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log(" logout :: error", error);
        }
    }

    async updatePassword(oldPassword, newPassword){
        try {
            let user = await account.updatePassword(newPassword, oldPassword)
            return user
        } catch (error) {
            console.log(" change password :: error", error);
            throw error
        }
    }
}

const authService = new AuthService()
export default authService;