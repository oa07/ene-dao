module.exports = (error) => {
  const { context, type } = error.details[0];
  const { name, label, value, limit } = context;

  const dataType = type.split('.')[0];
  const dataError = type.split('.')[1];
  let msg;
  if (dataError === 'empty') msg = `${label} must not be empty`;
  if (dataError === 'base') msg = `${label} must be ${dataType}`;
  if (dataError === 'alphanum') msg = `${label} must be alphanumeric`;
  if (dataError === 'min' || dataError === 'max') {
    let comp = dataError === 'max' ? 'less' : 'greater';
    let charc = dataType === 'string' ? ' characters' : '';
    msg = `${label} must be ${comp} than or equal to ${limit}${charc}`;
  }
  if (dataError === 'required') msg = `${label} is required`;
  if (dataError === 'integer') msg = `${label} must be an integer`;
  if (dataError === 'email') msg = `${label} is not valid`;
  if (dataError === 'length') msg = `${label}'s length must be ${limit}`;
  if (dataError === 'pattern') {
    if (name === '[az][AZ][09]')
      msg = `${label} must contain characters [a-z], [A-Z], [0-9]`;
    if (name === '[09]') msg = `${label} must contain digits [0-9]`;
    if (name === '[az][AZ][ .]') msg = `${label} is not well formatted`;
  }
  return {
    errorField: label,
    message: msg,
  };
};
