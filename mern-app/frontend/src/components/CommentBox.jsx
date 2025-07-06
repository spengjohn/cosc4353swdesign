import React from "react";

const CommentBox = React.forwardRef(
  (
    {
      label = "Comment",
      placeholder = "Enter your text here...",
      rows = 4,
      className = "",
      labelClass = "",
      errorMessage,
      ...props // includes name, value, onChange from register()
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={props.name}
            className={`block text-md font-medium ${labelClass}`}
          >
            {label}
          </label>
        )}
        <textarea
          id={props.name}
          rows={rows}
          placeholder={placeholder}
          ref={ref}
          {...props}
          className="bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default CommentBox;
