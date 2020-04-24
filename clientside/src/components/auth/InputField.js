import React from 'react';
import { Input } from 'reactstrap';
import { Field } from 'react-final-form';

export default function (props) {
  const errorShowing = (meta) => {
    return (
      meta.error &&
      meta.touched && <div className='formError'> * {meta.error}</div>
    );
  };

  const { Name, Type, ID, Placeholder } = props;
  return (
    <Field name={Name}>
      {({ input, meta }) => (
        <div>
          <Input {...input} type={Type} id={ID} placeholder={Placeholder} />
          {errorShowing(meta)}
        </div>
      )}
    </Field>
  );
}
