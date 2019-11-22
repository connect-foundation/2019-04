const API_SERVER =
    process.env.NODE_ENV === 'production'
        ? process.env.PROD_API_SERVER_IP
        : process.env.DEV_API_SERVER_IP;

export {
    API_SERVER
};