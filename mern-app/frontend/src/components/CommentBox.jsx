export default function CommentBox({
  label = "Comment",
  name = "comment",
  value,
  onChange,
  placeholder = "Enter your text here...",
  required = false,
  rows = 4,
  className = "",
  labelClass = ""
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block text-md font-medium ${labelClass}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
