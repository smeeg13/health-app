import React from "react";


export default class QuestionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newQuestion: this.emptyQuestion,
    }
    this.myRef = React.createRef();
  }

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


export function QuestionList({ questions }) {
  return (
    <ul>
      {questions((q) =>
        <li key={q.id}>
          <div>
            <p>
              <Question question={q} />
            </p>
          </div>
        </li>
      )}
    </ul>
  );
}

class Question extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleLikeClick}>
          {this.props.liked ? <span>Unliked</span> : <span>Liked</span>}
        </button>
        <p style={{ color: this.props.liked ? "lightgreen" : "white" }}>
          {this.props.title}</p>
        <p>{this.props.author}</p>
        <p>{this.props.year}</p>
        <p>{this.props.pages}</p>
        <p>Seconds since published : {secondsSincePublished} </p>
        <p><img style={{ maxHeight: '300' }} src={this.props.cover} /></p>
      </div>
    );
  }


  //... comme pour la classe Book
}
