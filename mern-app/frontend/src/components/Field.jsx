import React, { forwardRef } from "react";

const Field = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "",
      required = false,
      className = "",
      labelClass = "",
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={`block text-md font-medium ${labelClass}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          {...rest}
          className="bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default Field;

/*
}) {
  return (
    <div className={` ${className}`}>
      {label && (
        <label htmlFor={name} className={`block text-md font-medium ${labelClass}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}*/
