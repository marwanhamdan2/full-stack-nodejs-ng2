/**
 * Routes list
 */
module.exports = [

    {
        'verb' : 'get',
        'route' : '/websocket-view',
        'controllerAction' : 'Views/Websocket',
        'middlewares' : [],
        'useCache' : false 
    },

    /**
     * DEPARTMENT APIS
     */
    {
        'verb' : 'get',
        'route' : '/department',
        'controllerAction' : 'Department/Read',
        'middlewares' : [],
        'useCache' : false 
    },
    {
        'verb' : 'post',
        'route' : '/department',
        'controllerAction' : 'Department/Create',
        'middlewares' : [],
        'useCache' : false
    },
    {
        'verb' : 'delete',
        'route' : '/department/:id',
        'controllerAction' : 'Department/Delete',
        'middlewares' : [],
        'useCache' : false
    },
    {
        'verb' : 'put',
        'route' : '/department',
        'controllerAction' : 'Department/Update',
        'middlewares' : [],
        'useCache' : false
    },

    /**
     * EMPLOYEE APIS
     */
    {
        'verb' : 'get',
        'route' : '/employee/:deptId',
        'controllerAction' : 'Employee/Read',
        'middlewares' : [],
        'useCache' : false 
    },
    {
        'verb' : 'post',
        'route' : '/employee',
        'controllerAction' : 'Employee/Create',
        'middlewares' : ['Token'],
        'useCache' : false
    },
    {
        'verb' : 'delete',
        'route' : '/employee/:empId',
        'controllerAction' : 'Employee/Delete',
        'middlewares' : [],
        'useCache' : false
    },
    {
        'verb' : 'put',
        'route' : '/employee',
        'controllerAction' : 'Employee/Update',
        'middlewares' : [],
        'useCache' : false
    },


    /**
     * Accounts
     */
    {
        'verb' : 'post',
        'route' : '/user/register',
        'controllerAction' : 'User/Register',
        'middlewares' : [],
        'useCache' : false        
    },
    
    {
        'verb' : 'post',
        'route' : '/user/login',
        'controllerAction' : 'User/Login',
        'middlewares' : [],
        'useCache' : false        
    },
        
    {
        'verb' : 'get',
        'route' : '/user/authenticate',
        'controllerAction' : 'User/Authenticate',
        'middlewares' : [],
        'useCache' : false        
    },

    {
        'verb' : 'get',
        'route' : '/web-socket-init/watch-file-data',
        'controllerAction' : 'WebSocketInit/getWatchFileData',
        'middlewares' : [],
        'useCache' : false        
    },    

    {
        'verb' : 'post',
        'route' : '/upload/image',
        'controllerAction' : 'Upload/Image',
        'middlewares' : [],
        'useCache' : false        
    },      
]
