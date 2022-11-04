import React from "react"; 
import { db } from "../initFirebase";
import { doc, updateDoc } from "firebase/firestore";

export const BouncingDotsLoader = (props) => {
    return (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
    );
  };

  export function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
  }

  
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

export function GetTodayDateString(){
  const currentDate = new Date();
      const currentDayOfMonth = currentDate.getDate();
      const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
      const currentYear = currentDate.getFullYear();

      const dateString =
        currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

      return dateString;  
}


export async function SaveOneFieldInDB(
  id_user,
  fieldNameToChange,
  newValue,
  saveInDocteur
) {
  let Ref;
  if (saveInDocteur) {
    Ref = doc(db, "Docteur", id_user);
  } else {
    Ref = doc(db, "User", id_user);
  }

  // Set the "fieldNameToChange" field of the city 'DC'
  await updateDoc(Ref, {
    [fieldNameToChange]: newValue,
  });
}
