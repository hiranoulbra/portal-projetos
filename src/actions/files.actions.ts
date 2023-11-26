import { ArchiveType } from "@/types/archive";
import { BlobServiceClient } from "@azure/storage-blob";

import sql from 'mssql';



async function AddFile(projectId: number, name: string, file: File) {

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
        const blockBlobClient = containerClient.getBlockBlobClient(`${projectId}/${name}`);
        const buffer = await file.arrayBuffer();
        const uploadResponse = await blockBlobClient.upload(buffer, file.size);
    }
    catch (error) {
        console.log({ error });
        throw error;
    }
    return true;
}

export const uploadFiles = async (files: File[], projectId: number) => {

  
    const pool = await sql.connect(process.env.DB_CONNECTION);

    for (const file of files) {

        const type = file.type;
        const size = file.size / 1024;



        await pool.request().
            input('name', sql.VarChar, file.name)
            .input('project_id', sql.Int, projectId)
            .input('type', sql.NVarChar, type)
            .input('size', sql.Float, size)
            .query(`
                INSERT INTO dbo.files (name, project_id, type, size)
                VALUES (@name,@project_id, @type, @size)
            `);
        await AddFile(projectId, file.name, file);
    }
};

export const getFile = async (projectId: number, fileName: string) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(`${projectId}/${fileName}`);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);

    return downloadBlockBlobResponse.readableStreamBody
}

export const deleteFiles = async (projectId: number, files: number[]) => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    for (const file of files) {
        let result = await pool.request()
            .input('project_id', sql.Int, projectId)
            .query(`
                Select id,name FROM dbo.files
                WHERE project_id = @project_id
            `);
        
        let deleteFiles = result.recordset.filter((file: ArchiveType) => files.indexOf(file.id) === -1);
        for (const file of deleteFiles) {
            await deleteFile(projectId, file.name);
            await pool.request()
                .input('id', sql.Int, file.id)
                .query(`
                DELETE FROM dbo.files
                WHERE id = @id
            `);
        }
    }
}


export const deleteFile = async (projectId: number, fileName: string) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(`${projectId}/${fileName}`);

    const deleteResponse = await blockBlobClient.deleteIfExists();

    return deleteResponse;
}