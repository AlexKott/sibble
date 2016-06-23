module.exports = ENV => {
    switch (ENV) {
        case 'production':
            return {
                port: 8010,
                env: 'production',
                dbUrl: process.env.DATABASE_URL,
            };
        case 'test':
            return {
                port: 8080,
                env: 'test',
                dbUrl: 'mongodb://localhost:27017/alexkott-test',
            };
        case 'development':
        default:
            return {
                port: 8080,
                env: 'development',
                dbUrl: 'mongodb://localhost:27017/alexkott-dev',
            };
    }
};
