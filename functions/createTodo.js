const fetch = require('cross-fetch');
const getAuthToken = require('./utils/getAuthToken');
const ENDPOINT = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v1`;
const ASTRA_DB_KEYSPACE = process.env.ASTRA_DB_KEYSPACE;
const TABLE_NAME = 'jamstack_todos';
let cachedToken

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if(!cachedToken){
    cachedToken = await getAuthToken();
  }

  try {
    const response = await fetch(`${ENDPOINT}/keyspaces/${ASTRA_DB_KEYSPACE}/tables/${TABLE_NAME}/rows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cassandra-token': cachedToken.authToken,
      },
      body: JSON.stringify({
        columns: body.columns
      })
    }).then(res => res.json());
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e)
    }
  }
}
