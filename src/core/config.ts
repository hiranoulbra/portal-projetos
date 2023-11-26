export default {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1344,
    user: process.env.DB_USER || 'pp',
    password: process.env.DB_PASS || 'portal@2020!',
    database: process.env.DB_NAME || 'portal-projetos'
}