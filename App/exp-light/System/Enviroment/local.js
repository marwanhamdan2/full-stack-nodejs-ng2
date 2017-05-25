module.exports = {
    WEB_SERVER_PORT : process.env.PORT || 8020,
    WEB_HTTPS_SERVER_PORT: process.env.SPORT || 8021,
    TOKEN : 'QcG6kP3yDnUHD67hWAAQyqrDdFm4gBPW',
    BASE_URL : process.env.BASE_URL || 'http://127.0.0.1',
    API_URL : process.env.API_URL || 'http://127.0.0.1',
    CACHE_HOST : process.env.CACHE_HOST || '127.0.0.1',
    CACHE_PORT : Number( process.env.CACHE_PORT ) || 6379,
    CACHE_EXPIRE : Number( process.env.CACHE_EXPIRE  ) || 60,
    SITEMAP_PAGE_LIMIT: 1000,
    WATCH_FILE: process.env.WATCH_FILE || './tmp/watch_file',
    DB_SOURCE: {
        COUNT : 1,
        /**
         * For different data sources 
         * Datasource Fragmentaion
         * Horizontal Sharding (reduce table sizes based on grouping attribute like city)
         *  --> devide the whole data into different sources (same schema structure)
         *  --> based on the statistics where we try to make all sources have almost the same bandwidth 
         */
        DB_SERVER_1 : {
            /**
             *  
             */
            host_read     : '127.0.0.1',
            host_write    : '127.0.0.1',
            user     : 'root',
            password : '12345',
            database : 'datax'
        },
        DB_SERVER_DEFAULT : {
            host_read     : '127.0.0.1',
            host_write    : '127.0.0.1',
            user     : 'root',
            password : '12345',
            database : 'datax'
        }
    }
}