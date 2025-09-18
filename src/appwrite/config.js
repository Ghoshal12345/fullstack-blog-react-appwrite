import conf from "../conf/conf"
import { Client, ID, Storage, Query, TablesDB } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }
    // this is for tabular data
    async createBlog({ title, slug, content, featuredImage, status, userId }) {
        console.log("👉 userId received in service:", userId);
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,// slug becomes $id
                data: { title, content, featuredImage, status, user: userId }
            });
        } catch (error) {
            throw error;
        }
    }

    async updateBlog(slug, { title, content, featuredImage, status, userId }) {//we don't need  userId cuz we only give access to update their own post
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,// slug becomes $id
                data: { title, content, featuredImage, status, user: userId }
            });
        } catch (error) {
            console.log("Appwrite Service Error :: updatePost :: ", error);
        }

    }

    async deleteBlog(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });
            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deletePost :: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite Service Error :: getPost :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries
            })
        } catch (error) {
            console.log("Appwrite Service Error :: getPosts :: ", error);
            return [];
        }
    }







    // now let's do for img/video/files service
    async uploadFile(file) {//file is not name file is a blob
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });

        } catch (error) {
            console.log("Appwrite Service Error :: uploadFile :: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });

            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            // return a placeholder image if no featured image is set
            return "/placeholder.png"; // <-- put a real placeholder in your /public
        }
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
    }



}
// what is slug?: a slug is a URL-friendly version of a string, typically used in web development to create readable and SEO-friendly URLs. It usually consists of lowercase letters, numbers, and hyphens instead of spaces or special characters.
// here we are using slug in place of document id cuz it is unique identifier for each row and it is more readable than document id
const appwriteService = new Service();
export default appwriteService;