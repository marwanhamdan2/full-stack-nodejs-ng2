var queryRunner = require('../Utils/Database/QueryRunner');

module.exports = {
    readDepartment: function(){
        return queryRunner.runQuery(1,`
            SELECT * FROM DEPARTMENT
        `, 'read');
    },

    createDepartment: function(name){
        return queryRunner.runQueryWP(1,`
            INSERT INTO DEPARTMENT(name)
            VALUES (?)
        `, [name], 'write');
    },

    deleteDepartment: function(id){
        return queryRunner.runQueryWP(1,`
            DELETE FROM DEPARTMENT
            WHERE id=?
        `, [id], 'write');
    },

    updateDepartment: function(inputData){
        var id = inputData.rowId;
        delete inputData.rowId;
        var updateSqlString = ``;
        Object.keys(inputData).forEach(key=>{
            updateSqlString += ` ${key}='${inputData[key]}',`
        });
        updateSqlString = updateSqlString.substring(0, updateSqlString.length-1);
        
        
        return queryRunner.runQueryWP(1, `
            UPDATE DEPARTMENT
            SET ${updateSqlString}
            where id=?
        `, [id], 'write');
    }
}