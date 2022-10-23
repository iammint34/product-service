export default () => ({
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DATABASE_PORT || 3306,
        schema: process.env.DB_NAME,
        DATABASE_URL: `$mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DATABASE_PORT}/${process.env.DB_NAME}`
    }
});