const axios = require('axios');
const {getBody, getSchema, getTypes, typesOfkindObject, customObjecTypes, toReasonType} = require('./utils');
const {graphqlIntrospectionQuery} = require('./graphql');

if(!process.argv)
  throw new Error('reason-generate-types-from-graphql should run in a NodeJS process');

if(process.argv.length !== 3) {
  throw new Error(`
    reason-generate-types-from-graphql should have 1 parameter: the url of the remote server
    Example: reason-generate-types-from-graphql "http://www.your-url/graphql"
  `);
}

(function() {
  const url = process.argv[2];

  axios.post(url, {
    query: graphqlIntrospectionQuery
  })
    .then((response) => {
      const x = [response]
        .map(getBody)
        .map(getSchema)
        .map(getTypes)[0]
        .filter(typesOfkindObject)
        .filter(customObjecTypes)
        .reduceRight(toReasonType, '');

      console.log(x);
    })
    .catch(err => {
      console.error('reason-generate-types-from-graphql: ');
      console.error('Error accessing remote GraphQL API');
      console.log(err);
    })
})();