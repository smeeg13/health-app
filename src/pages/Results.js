import React from "react";
import {  useState } from "react";

function Resultats(props) {
  //The Resultat object coming from the survey
  //Need user data and avatar existant
  //need user response of the 3 questionnaires

  const [responseQ1, setResponseQ1] = useState(undefined);
  const [responseQ2, setResponseQ2] = useState(undefined);
  const [responseQ3, setResponseQ3] = useState(undefined);
  const [resultat, setResultat] = useState(props.resultat);

  let handleChangesQ1 = (e) => {
    e.preventDefault();
    setResponseQ1(e.target.value);
  };
  let handleChangesQ2 = (e) => {
    e.preventDefault();
    setResponseQ2(e.target.value);
  };
  let handleChangesQ3 = (e) => {
    e.preventDefault();
    setResponseQ3(e.target.value);
  };
  let handleChangesRes = (e) => {
    e.preventDefault();
    setResultat(e.target.value);
  };

  return (
    <>
      {/* Box for data questionnaire 1-2  */}
      <div className="container result1">
        <TitleBox title="Vous - Famille" my_avatar={props.currentUser.avatar} />
        {/* <BoxQuestionnaire handleChanges={handleChangesQ1} data={responseQ1}/> */}
        {/* <BoxQuestionnaire handleChanges={handleChangesQ2} data={responseQ2}/> */}
      </div>

      {/* Box for data questionnaire 3 */}
      <div className="container result2">
        <TitleBox title="Habitudes " my_avatar={props.currentUser.avatar} />
        {/* <BoxQuestionnaire handleChanges={handleChangesQ2} data={responseQ2}/> */}
      </div>

      {/* Box for Resultat  */}
      <div className="container result3">
        <TitleBox title="Resultats" my_avatar={props.currentUser.avatar} />
        {/* <BoxResultat handleChanges={handleChangesRes} data={resultat}/> */}
      </div>

      {/* Button for saving into db changes */}
    </>
  );
}

function TitleBox(props) {
  <div>
    {/* Need the title of the questionnaire
          Need the avatar of the user */}
    <h2>props.title</h2>
    <div className="container result1">
      <img className="my_avatar" src={props.my_avatar} />
    </div>
  </div>;
}
class BoxQuestionnaire extends React.Component {
  // Need the list of response of questionnaire
  //Inserted into a form, to be able to transform them
  constructor(props, context) {
    super(props, context);
    this.state = {
      list_reponses: this.props,
    };
  }

  handleFormInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => ({
      list_reponses: { ...prevState.list_reponses, [name]: value },
    }));
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();

    this.props.handleChanges();
  };

  render(){
    return (
      <>
          <form onSubmit={this.handleFormSubmit} >
            <label>Age : </label>
            <FormInput
              type="number"
              fieldRef={this.myRef}
              name="age"
              placeholder="Age"
              value={this.state.list_reponses.age}
              onChange={this.handleFormInputChange}
            />
            <label>Sexe : </label>
            <FormInput
              type="text"
              name="sexe"
              placeholder="Sexe"
              value={this.state.list_reponses.sexe}
              onChange={this.handleFormInputChange}
            />
            <label>Poids : </label>
            <FormInput
              type="text"
              name="poids"
              placeholder="Poids"
              value={this.state.list_reponses.poids}
              onChange={this.handleFormInputChange}
            />
            <label>Taille : </label>
            <FormInput
              type="text"
              name="taille"
              placeholder="Taille"
              value={this.state.list_reponses.taille}
              onChange={this.handleFormInputChange}
            />
          </form>
      </>
    );
  }
}



function BoxResultat(props) {}

function FormInput({ label, type, name, value, onChange, placeholder }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <br />
    </>
  );
}

// export default function Results() {
//   return (
//     <>
//       <Navbar />
//       <div className="container result1">
//         <img className="my_avatar" src={my_avatar} />
//       </div>

//       <div className="container result2">
//         <img className="my_avatar" src={my_avatar} />
//       </div>

//       <div className="container result3">
//         <img className="my_avatar" src={my_avatar} />
//       </div>
//     </>
//   );
// }

// const Container2 = styled.div`

// .container {
//   margin-left: auto;
//   margin-right: auto;
//   height: 100%;
//   width: 100%;
//   position: fixed;
//   z-index: 1;
//   top: 10%;
//   overflow-x: hidden;
// }

// .my_avatar{
//   height:100px;
//   width:100px;
// }

// .left {
//   width: 33%;
//   left: 0;
//   background-color: pink;
// }

// .right {
//   width: 33%;
//   right: -15px;
//   background-color: #BBF3DD;
//   transform: translateZ(0);
//   z-index: -1;
// }

// .middle {
//   width: 33%;
//   align-items: center;
//   color: blueviolet;

// }

// /* .quiz3{
//     right:0;
//     width: 33%;
//     background-color:blueviolet;
// } */

// `
