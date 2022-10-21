import React from "react";
import { useState, useContext } from "react";
import { Context } from "react";


export default class QuestionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newQuestion: this.emptyQuestion,
    }
    this.myRef = React.createRef();
  }
  resultatContext = useContext(ResultatContext);
  emptyQuestion = { max: "", min: "", question: "", unites: "", val_predefined: "", val_predefined2: "" }

  render() {
    return (
      <>
        <FormInput
          fieldRef={this.myRef}
          type="text"
          name="max"
          placeholder="Max"
          value={this.state.newQuestion.max}
        //onChange={this.handleInputChange}
        />
        <FormInput
          fieldRef={this.myRef}
          type="text"
          name="min"
          placeholder="min"
          value={this.state.newQuestion.min}
        //onChange={this.handleInputChange}
        />
        <FormInput
          fieldRef={this.myRef}
          type="text"
          name="question"
          placeholder="question"
          value={this.state.newQuestion.question}
        //onChange={this.handleInputChange}
        />
      </>
    );
  }
}

export function FormInput({ type, name, value, onChange, placeholder, fieldRef }) {
  /*
   Il est important de changer le nom ref en fieldRef lorsque l'on passe
   des informations dans une function, le nom "ref" est réservé
  */
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={fieldRef ? fieldRef : null}
      />
      <br />
    </>
  );
}




export function QuestionList( {ques} ) {
  console.log(ques);
  return (
    <>
      <ul>
        {ques.map(q =>
          <li key={q.id}>
            <p>
              {q.question}
              {q.typeAnswer === 'checkbox' && <CheckBoxForm />}
              {q.typeAnswer === 'slider' && <Range q={q.min}/>}
              {q.typeAnswer === 'dropdown' && <Dropdown />}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

function Dropdown () {
  const [value, setValue] = React.useState('homme');

  const handleChange = (event) => {
    setValue(event.target.value);
  }   

  return (
    <div>
    <label className="label">Sex</label>
              <br />
              <select value={value} onChange={handleChange}>
                  <option value="woman">Woman</option>
                  <option value="man">Man</option>
              </select>
    </div>
    
  );
};

function Range (props) {
  const [weight, setWeight] = useState(10);
  
  const changeWeight = (event) => {
    setWeight(event.target.value);
  };

  return (
    <div>
      <h1>poids : {weight}</h1>
      <input
        style={{ backgroundColor: "blueviolet" }}
        type="range"
        onChange={changeWeight}
        min={props.min}
        max={props.max}
        step={1}
        value={props}
        className="custom-slider"
      />
    </div>
  );
};

function toggleCheckBox(value) {
  return !value;
}

function CheckBoxForm() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(toggleCheckBox)}
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(toggleCheckBox)}
      />
    </div>
  )
}


export function Loader() {
  return (
    <p>
      ...
    </p>
  );
}




// class Question extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  

//   render() {
//     console.log('min',this.props.min);
//     console.log('typeAnswer', this.props.typeAnswer);
//     return (
//       <>
//         <p>
//           {this.props.question}
//           {this.props.typeAnswer === 'checkbox' && <CheckBoxForm />}
//           {/* {this.props.typeAnswer === 'slider' &&
//             //https://retool.com/blog/building-a-react-slider/
//             <ReactSlider />
//           } */}
//         </p>
//       </>
//     );
//   }
// }

// export function QuestionList({ questionList }) {
//   return (
//     <>
//       <ul>
//         {questionList.map(q =>
//           <li key={q.id}>
//             <p>
//               <Question question={q.question} />
//             </p>
//           </li>
//         )}
//       </ul>
//     </>
//   );
// }