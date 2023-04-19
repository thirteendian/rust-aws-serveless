const AWS = require("aws-sdk");
const uuid = require("uuid");

// const s3 = new AWS.S3();
// const athena = new AWS.Athena({ region: process.env.AWS_REGION });

const uploadDataToS3 = async (s3, data) => {
    const serializedData = JSON.stringify(data);
    const key = `data/${uuid.v4()}.json`;

    const params = {
        Bucket: process.env.TDEEBucket,
        Key: key,
        Body: serializedData,
    };

    await s3.putObject(params).promise();
};

const queryAthena = async (athena) => {
    const query = `SELECT * FROM tdee_data.results`;

    const params = {
        QueryString: query,
        ResultConfiguration: {
            OutputLocation: process.env.ATHENA_RESULTS_OUTPUT_LOCATION,
        },
        QueryExecutionContext: {
            Database: "tdee_data",
        },
    };

    const queryExecution = await athena.startQueryExecution(params).promise();
    const queryExecutionId = queryExecution.QueryExecutionId;

    let queryStatus;
    do {
        const statusResult = await athena
            .getQueryExecution({ QueryExecutionId: queryExecutionId })
            .promise();
        queryStatus = statusResult.QueryExecution.Status.State;
    } while (queryStatus === "RUNNING");

    if (queryStatus === "SUCCEEDED") {
        const results = await athena
            .getQueryResults({ QueryExecutionId: queryExecutionId })
            .promise();
        return results.ResultSet.Rows.slice(1).map((row) => {
            const rowData = row.Data;
            return {
                age: rowData[0].VarCharValue,
                height: rowData[1].VarCharValue,
                weight: rowData[2].VarCharValue,
                // Add other fields as required
            };
        });
    } else {
        throw new Error(`Athena query failed: ${JSON.stringify(queryStatus)}`);
    }
};

module.exports = {
    uploadDataToS3,
    queryAthena,
};
