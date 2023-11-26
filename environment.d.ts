namespace NodeJS {
    interface ProcessEnv {
        DB_CONNECTION: string;
        NEXTAUTH_SECRET: string;
        NEXTAUTH_URL: string;
        AZURE_CONTAINER_NAME: string;
        AZURE_STORAGE_CONNECTION_STRING: string;
    }
}