// Importa el sdk de AWS
const AWS = require('aws-sdk');

const docDynamo = new AWS.DynamoDB.DocumentClient();    // Doc Client para
                                                        // administrar las tablas
class DynamoHelper {
    saveData(table, item) {
        const params = {
            TableName: table,         // Nombre de la tabla
            Item: item,
            ConditionExpression : 'attribute_not_exists(UserId)'
        };

        return docDynamo.put(params).promise();
    }

    loadData(table) {
        const params = {
            TableName: table        // Nombre de la tabla
        };

        return docDynamo.scan(params).promise();
    }
}

module.exports = DynamoHelper;
