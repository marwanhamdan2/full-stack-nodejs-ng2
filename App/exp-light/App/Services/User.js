var QueryRunner  = require('../Utils/Database/QueryRunner');
var md5 = require('md5');
var jwt = require('jsonwebtoken');


const secret = 'my-jwt-token-secret';


module.exports = {
    isUserExisted: function(username){
        
        return new Promise((resolve, reject)=>{
            var query = `
                SELECT * 
                FROM USER U
                where U.username=?
            `;

            QueryRunner.runQueryWP(1, query, [username], 'read')
            .then(res=>{
                if(res.length)
                    return resolve(true);
                return resolve(false);
            })  
            .catch(err=>{
                return reject(err);
            })
        });
    },
    
    createUser: function(username, password){
        return new Promise((resolve, reject)=>{
            this.isUserExisted(username)
            .then(isExisted=>{
                if(isExisted)
                    return reject(`user ${username} already existed`);
                
                var query = `
                    INSERT INTO USER(username, password, created_at)
                    VALUES(?,?,NOW())
                `;
                var passwordEncoded = md5(password);

                QueryRunner.runQueryWP(1, query, [username, passwordEncoded], 'write')
                .then(res=>{
                    var userId = res.insertId;
                    return resolve(userId);
                })
                .catch(err=>{
                    console.log(err);
                    return reject(err);
                })
            })
            .catch(err=>{
                return reject(err);
            })
        });
    },

    fetchUserData: function(username, password){
        return new Promise((resolve, reject)=>{
            var passwordEncoded = md5(password);

            var query = `
                SELECT * from USER U
                where U.username=? and U.password=?
            
            `;


            QueryRunner.runQueryWP(1, query, [username, passwordEncoded], 'read')
            .then(res=>{
                if(res && res.length){
                    return resolve(res[0]);
                }
                return reject(`failed to login in`);
            })
            .catch(err=>{
                return reject(err);
            })
        });
    },

    createToken: function(data){
        return jwt.sign(data, secret, {
            expiresIn: 24*24*60
        });
    },

    getUserDataFromToken(token){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, secret, (err, decoded)=>{
                if(err){
                    return reject(`invalid token`);
                }

                return resolve(decoded);
            })
        });
    }
    
}