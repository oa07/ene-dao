module.exports = error => {
  const { context, type } = error.details[0];
  const { name, label, value, limit } = context;

  const dataType = type.split('.')[0];
  const dataError = type.split('.')[1];
  if (dataError === 'empty') return `${label} must not be empty`;
  if (dataError === 'base') return `${label} must be ${dataType}`;
  if (dataError === 'alphanum') return `${label} must be alphanumeric`;
  if (dataError === 'min' || dataError === 'max') {
    let comp = dataError === 'max' ? 'less' : 'greater';
    let charc = dataType === 'string' ? ' characters' : '';
    return `${label} must be ${comp} than or equal to ${limit}${charc}`;
  }
  if (dataError === 'required') return `${label} is required`;
  if (dataError === 'integer') return `${label} must be an integer`;
  if (dataError === 'email') return `${label} is not valid`;
  if (dataError === 'length') return `${label}'s length must be ${limit}`;
  if (dataError === 'pattern') {
    if (name === '[az][AZ][09]')
      return `${label} must contain characters [a-z], [A-Z], [0-9]`;
    if (name === '[09]') return `${label} must contain digits [0-9]`;
    if (name === '[az][AZ][ .]') return `${label} is not well formatted`;
  }
};
