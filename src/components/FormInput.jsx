

export function FormInput({
    disabled,
    id,
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    min,
    max,
    
  }) {
    return (
      <>
        <label>{label}</label>
        <input
        disabled={disabled}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
        <br />
      </>
    );
  }