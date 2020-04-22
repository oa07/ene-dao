import React from 'react';

export default function (props) {
  const { error } = props;
  return (
    <div>
      {error && (
        <div className='alert alert-danger text-center' role='alert'>
          {error}
        </div>
      )}
    </div>
  );
}
