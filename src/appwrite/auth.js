import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;//just a varaible
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });

            if (userAccount) {
                return this.login({email, password});
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
        } catch (error) {
            throw error
        }
    }

    // to check account is existed or not
    async getCurrentUser() {
        try {
            return await this.account.get();//return promise
        } catch (error) {
            
            console.log("Appwrite Auth Error :: getCurrentUser :: ", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();//return promise
        } catch (error) {
            console.log("Appwrite Auth Error :: logout :: ", error);
        }
    }
}



const authService = new AuthService();//in refernce about single user
export default authService;

// here is the future proof authentication service of appwrite