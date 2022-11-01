import { db } from "../initFirebase";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { ThemeContext, themes } from "../Context";
import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";
import { GetAllDocteurs, NewRequest } from "../objects_managers/DocteurManager";
import { Loader } from "../components/QuestionForm";

function Account(props) {
  const avatar1 = "/img/avatar1.png";
  const avatarr = "/img/avatar_roux.png";
  const avatar3 = "/img/avatar3.png";
  const avatar4 = "/img/avatar4.png";
  const avatar5 = "/img/avatar5.png";
  const avatar6 = "/img/avatar6.png";

  let themeContext = useContext(ThemeContext);

  const [avatarSelected, setAvatar] = useState(props.currentUser.avatar);
  const [nameEntered, setNameEntered] = useState(props.currentUser.nom);
  const [docteurSelectForRequest, setDocteurSelectForRequest] = useState(undefined);
  const [docteurAssigned, setDocteurAssigned] = useState("");
  const [docteurs, setDocteurs] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmSave, setConfirmSave] = useState("");

  useEffect(() => {
    const fetchDocteurs = async () => {
      const result = await GetAllDocteurs();
      console.log("Docteurs retrived :", result);
      setDocteurs(result);
      setBusy(false);
    };

    fetchDocteurs();
  }, []);

  useEffect(() => {
    const GetDocteurNameAssigned = () => {
      if (props.currentUser.docteur_assigned === "") {
        setDocteurAssigned("Please make a request to a doctor");
      } else {
        if (docteurs.length > 0) {
          let filteredArray = docteurs.filter(
            (item) => item.id_user === props.currentUser.docteur_assigned
          );
          setDocteurAssigned(filteredArray[0].nom);
        }
      }
    };

    GetDocteurNameAssigned();
  }, [props.currentUser.docteur_assigned]);

  useEffect(() => {
    setAvatar(props.currentUser.avatar);
  }, [props.currentUser.avatar]);

  useEffect(() => {
    setNameEntered(props.currentUser.nom);
  }, [props.currentUser.nom]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmSave("");
    }, 3000);
  }, [confirmSave]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const onClickHandler = (order) => {
    const str = order.target.src;
    const after_ = str.split("/").pop();
    let newStrg = "/img/" + after_;

    setAvatar(newStrg);
    console.log("Avatar Selected string : ", newStrg);
  };

  const HandleName = (event) => {
    setNameEntered(event.target.value);
  };
  const HandleDocteurSelect = (event) => {
    setDocteurSelectForRequest(event.target.value);
    console.log("Docteur selected : ", event.target.value);
  };

  const SendRequest = () => {
    if (docteurSelectForRequest !== "") {
      let docteur = docteurs.filter(
        (doc) => doc.id_user === docteurSelectForRequest
      );
      console.log("doc retrieved for request :", docteur[0]);
      NewRequest(docteur[0], props.currentUser.id_user, setMessage);
    }
  };

  const HandleSubmit = async (event) => {
    props.setUser((prevState) => {
      const clonedUser = _.clone(prevState);
      clonedUser.avatar = avatarSelected;
      clonedUser.nom = nameEntered;

      return clonedUser;
    });
    //Save into DB
    let Ref = doc(db, "User", props.currentUser.id_user);

    // Set the "fieldNameToChange" field of the city 'DC'
    try {
      await updateDoc(Ref, {
        avatar: avatarSelected,
        nom: nameEntered,
      });
      setConfirmSave("Changes Saved");
    } catch (e) {
      setConfirmSave("Error When saving modifications, please try later");
    }

    //navigate("/");
  };

  console.log(props.currentUser.avatar);
  // console.log(props.currentUser.name)

  return (
    <Container2>
      {isBusy ? (
        <Loader />
      ) : (
        <>
          <div
            className="container left"
            style={{
              backgroundColor: themes[themeContext.theme].background,
              color: themes[themeContext.theme].foreground,
            }}
          >
            <div className=" center">
              <h1
                className="choose_avatar center"
                style={{
                  marginLeft: 20,
                  color: themes[themeContext.theme].textcolor,
                }}
              >
                Enter your personnal information
              </h1>
            </div>

            <div className="center " style={{ marginBottom: -10 }}>
              <label>Name : {"  "}</label>
              <input
                name="nom"
                className="text_input"
                type="text"
                maxLength={30}
                value={nameEntered}
                required
                onChange={HandleName}
                style={{ margin: 0 }}
              />
            </div>

            <div className="center" style={{ marginTop: -30 }}>
              <h3
                className="choose_avatar"
                style={{
                  color: themes[themeContext.theme].textcolor,
                }}
              >
                Avatar selected{" "}
              </h3>
              <img
                className="avatar1"
                src={avatarSelected}
                defaultValue={avatar1}
                alt="avatar"
              ></img>
            </div>
            <div className="center">
              <button
                className="btn"
                style={{
                  margin: 0,
                  width: 100,
                  backgroundColor: themes[themeContext.theme].button,
                  color: themes[themeContext.theme].textcolorbtn,
                  fontSize: 14,
                  margin:"auto"
                }}
                onClick={HandleSubmit}
              >
                Save
              </button>


              <div>
                {confirmSave === "Changes Saved" ? (
                  <span style={{ color: "#00A36C", marginRight: 3 }}>
                    {confirmSave}
                  </span>
                ) : (
                  <span style={{ color: "#FF2400", marginRight: 3 }}>
                    {confirmSave}
                  </span>
                )}
              </div>
            </div>
            <br />
            <div>
              {props.currentUser.docteur_assigned !== "" && (
                <div className="center">
                  <h1
                    className="choose_avatar">
                    Doctor assigned to you
                  </h1>
                  <input
                    disabled
                    name="docteur_assigned"
                    className="text_input"
                    type="text"
                    maxLength={30}
                    value={docteurAssigned} //TODO:: retrieve the name of Doc
                  />
                </div>
              )}

              <div className=" center">
                <h1
                  className="choose_avatar"
                  style={{
                    margin: 15,
                    color: themes[themeContext.theme].textcolor,
                  }}
                >
                  Ask for a Doctor to take care of you
                </h1>
                <div className="row center" style={{ margin: 0 }}>
                  <div className="column_list center" style={{ margin: 0 }}>
                    <div>
                      {" "}
                      <label htmlFor="docteur_requested">
                        Select a doctor :{" "}
                      </label>
                      <select
                      className="dropdown"
                        name="docteur_requested"
                        id="docteur_requested"
                        value={docteurSelectForRequest}
                        onChange={(event) => HandleDocteurSelect(event)}
                        style={{ minWidth: 150 }}
                      >
                        {docteurs.map((value) => (
                          <option key={value.id_user} value={value.id_user}>
                            {value.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="column_list center">
                    <div>
                      <button
                        className="btn"
                        style={{
                          margin: 0,
                          width: 180,
                          backgroundColor: themes[themeContext.theme].button,
                          color: themes[themeContext.theme].textcolorbtn,
                          fontSize: 14,
                        }}
                        onClick={SendRequest}
                      >
                        Send Request
                      </button>
                    </div>
                    <div>
                      {message === "Request Sent" ? (
                        <span style={{ color: "#00A36C", marginRight: 3 }}>
                          {message}
                        </span>
                      ) : (
                        <span style={{ color: "#FF2400", marginRight: 3 }}>
                          {message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="container rightt"
            style={{
              backgroundColor: themes[themeContext.theme].background_right,
              color: themes[themeContext.theme].foreground,
            }}
          >
            <div className="flex-container">
              <h1
                className="choose_avatar"
                style={{
                  color: themes[themeContext.theme].textcolor,
                }}
              >
                Choose an avatar{" "}
              </h1>
              <div className="avatar">
                <img
                  className="avatar1"
                  alt="avatar1"
                  src={avatar1}
                  onClick={onClickHandler}
                ></img>
                <img
                  className="avatar2"
                  alt="avatarr"
                  src={avatarr}
                  onClick={onClickHandler}
                ></img>
                <img
                  className="avatar1"
                  alt="avatar3"
                  src={avatar3}
                  onClick={onClickHandler}
                ></img>
              </div>
              <div className="avatar">
                <img
                  className="avatar1"
                  alt="avatar4"
                  src={avatar4}
                  onClick={onClickHandler}
                ></img>
                <img
                  className="avatar1"
                  alt="avatar5"
                  src={avatar5}
                  onClick={onClickHandler}
                ></img>
                <img
                  className="avatar1"
                  alt="avatar6"
                  src={avatar6}
                  onClick={onClickHandler}
                ></img>
              </div>
            </div>
          </div>
        </>
      )}
    </Container2>
  );
}

export default Account;

const Container2 = styled.div`
  body {
    background: #bdc3c7; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c3e50,
      #bdc3c7
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c3e50,
      #bdc3c7
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 100%;
  }

  .left {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
    left: 0;
  }

  .rightt {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
    right: 0;
    background-color: #eafaf1;
    z-index: 1;
    overflow-x: hidden;
  }
  .label {
    align-items: center;
    font-size: 1em;
    text-align: center;
    color: #224957;
    font-size: 1em;
    font-weight: bold;
  }

  .logo {
    margin-top: 10px;
  }

  /* .nb_input{
    text-align:center;
    width: 50px;
}

.text_input{
    align-items:center;
    width: 200px;
} */

  select {
    position: relative;
    display: inline-block;
    color: pointer;
    margin-left: 15px;
    text-align: left;
    border: 1px solid;
    margin-bottom: 10px;
    height: 40px;
    width: 100px;
    margin-right: 10px;
    border-radius: 2px;
    border: 1px solid #77c5a6;
    background-color: white;
    cursor: pointer;
  }

  input {
    text-align: left;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    border: 1.5px solid #77c5a6;
    padding: 10px;
  }

  input:hover {
    background-color: #f2f3f4;
  }

  input:focus {
    border-color: #64b5f6;
  }

  .form_input {
    margin-left: 90px;
  }

  .avatar {
    margin-top: 20px;
    margin-left: 0px;
  }

  .choose_avatar {
    margin-top: 60px;
    margin-bottom: 20px;
    text-align: center;
    color: #224957;
    font-size: 1.2em;
  }

  .avatar1,
  .avatar2 {
    width: 110px;
    height: 130px;
  }

  .btn {
    margin-top: 20px;
    margin-left: 220px;
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    font-weight: bold;
    color: #ffff;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em; /*to round the corner of the shape */
    background: #77c5a6;
    border: 1px solid #77c5a6;
    /* box-shadow: 6px 6px 12px #c5c5c5,
             -6px -6px 12px #ffffff; */
  }

  .btn:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }

  .btn:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .btn:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #e8e8e8;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .btn:hover {
    color: #093545;
    border: 1px solid #e8e8e8;
  }

  .btn:hover:before {
    top: -35%;
    background-color: #e8e8e8;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  .btn:hover:after {
    top: -45%;
    background-color: #e8e8e8;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;
