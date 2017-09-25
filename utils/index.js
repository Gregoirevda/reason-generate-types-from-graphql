exports.getBody = response => response.data;

exports.getSchema = body => {
  if(body.data)
    return body.data.__schema;
  return body.__schema;
};

exports.getTypes = schema => schema.types;

exports.typesOfkindObject = type => {
  return type.kind === 'OBJECT';
};

exports.customObjecTypes = type => type.name && type.name.substr(0, 2) !== '__';

exports.toReasonType = (reasonTypes, graphqlType) => {
    const name = graphqlType.name.toLowerCase();
    const fields = graphqlType.fields
      .map(field => `${field.name}: ${field.type.name.toLowerCase()}`)
      .join(`,
      `);

    return `${reasonTypes}
    type ${name} = {
      ${fields}
    };
    `;
};