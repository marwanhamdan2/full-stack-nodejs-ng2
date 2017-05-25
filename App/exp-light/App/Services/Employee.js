var queryRunner = require('../Utils/Database/QueryRunner');



module.exports ={
    fetchDepartmentEmployees: function(deptId){
        var query = `
            select * 
            from EMPLOYEE
            where dept_id=?
        `;
        var queryParams = [deptId];
        return queryRunner.runQueryWP(1, query, queryParams, 'read');
    },

    deleteEmployee: function(empId){
        return queryRunner.runQueryWP(1, `
            DELETE FROM EMPLOYEE
            WHERE id=?
        `, [empId], 'write');
    },

    createEmployee: function(name, gender, deptId){
        return queryRunner.runQueryWP(1, `
            INSERT INTO EMPLOYEE (name, gender, dept_id)
            VALUES (?,?,?)
        `, [name, gender, deptId], 'write');
    },

    updateEmployee: function(inputData){
        var id = inputData.rowId;
        delete inputData.rowId;
        var updateSqlString = ``;
        Object.keys(inputData).forEach(key=>{
            updateSqlString += ` ${key}='${inputData[key]}',`
        });
        updateSqlString = updateSqlString.substring(0, updateSqlString.length-1);

        return queryRunner.runQueryWP(1, `
            UPDATE EMPLOYEE
            SET ${updateSqlString}
            where id=?
        `, [id], 'write');
    }
}