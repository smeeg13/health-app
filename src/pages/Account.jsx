
import styled from 'styled-components';
import avatar1 from './img/avatar1.png';
import avatarr from './img/avatar_roux.png';
import avatar2 from './img/avatar2.png';
import avatar3 from './img/avatar3.png';
import avatar4 from './img/avatar4.png';
import avatar5 from './img/avatar5.png';
import avatar6 from './img/avatar6.png';
import { Link } from 'react-router-dom'
import { ThemeContext, themes } from "../Context";
import React, { useContext } from "react";
import { setNestedObjectValues } from 'formik';

function Registration() {

  let themeContext = useContext(ThemeContext);

  const [avatar, setAvatar] = React.useState({
    avatar1: false,
    avatar2: false,
    avatar3: false,
    avatar4: false,
    avatar5: false,
    avatar6: false,
  });

  const onClickHandler = (order) => {
    setAvatar((prevState) => ({
      ...prevState,
      [order]: !prevState[order]
    }));
  };

  // const handleClick = (e) => {
  //  setAvatar(e.target.avatar);
  //  alert("clicked!" + avatar);
  // };

  return (
    <Container2>
      <div className="container left" style={{
        backgroundColor: themes[themeContext.theme].background,
        color: themes[themeContext.theme].foreground,
      }}>
        <h1 className="choose_avatar" style={{
          color: themes[themeContext.theme].textcolor,
        }}>Enter your personnal information</h1>
        <form>
          <label className="label" style={{
            color: themes[themeContext.theme].textcolor,
          }}>Name</label>
          <br />
          <input
            className="text_input"
            type="text"
            maxLength={30}
            // value={email}
            // onChange={handleEmailChange}
            required
          />

          <br></br>

          <label className="label" style={{
            color: themes[themeContext.theme].textcolor,
          }}>Firstname</label>
          <br />
          <input
            style={{ marginTop: "-15px" }}
            className="text_input"
            type="text"
            maxLength={30}
            // value={email}
            // onChange={handleEmailChange}
            required
          />

          <h1>Avatar selected </h1>
          {avatar.avatar1 && <img src={avatar1} alt="ground" />}
          {avatar.avatar2 && <img src={avatar2} alt="first" />}
          {avatar.avatar3 && <img src={avatar3} alt="second" />}

          {/* <label className="label">Age</label>
                    <br />
                    <input
                        className="nb_input"
                        type="text"
                        maxLength={3}
                        // value={email}
                        // onChange={handleEmailChange}
                        required
                    />
                    <br></br> */}

          {/* <label className="label">Weight</label>
                    <br />
                    <input
                        className="nb_input"
                        type="text"
                        maxLength={3}
                        // value={email}
                        // onChange={handleEmailChange}
                        required
                    />
                    <br></br>
                    <label className="label">Height</label>
                    <br />
                    <input
                        className="nb_input"
                        type="text"
                        maxLength={3}
                        // value={email}
                        // onChange={handleEmailChange}
                        required
                    /> */}
          <br></br>
          {/* <label className="label">Sex</label>
                    <br />
                    <select value={value} onChange={handleChange}>
                        <option value="woman">Woman</option>
                        <option value="man">Man</option>
                    </select> */}
        </form>
      </div>

      <div className="container rightt" style={{
        backgroundColor: themes[themeContext.theme].background_right,
        color: themes[themeContext.theme].foreground,
      }}>
        <div className="flex-container">
          <h1 className="choose_avatar" style={{
            color: themes[themeContext.theme].textcolor,
          }}>Choose an avatar </h1>
          <div className="avatar">
            <img className="avatar1" src={avatar1} onClick={onClickHandler}></img>
            <img className="avatar2" src={avatarr} onClick={onClickHandler}></img>
            <img className="avatar1" src={avatar3} onClick={onClickHandler}></img>
          </div>
          <div className="avatar">
            <img className="avatar1" src={avatar4} onClick={onClickHandler}></img>
            <img className="avatar1" src={avatar5} onClick={onClickHandler}></img>
            <img className="avatar1" src={avatar6} onClick={onClickHandler}></img>
          </div>
        </div>
        <Link to="/">
          <button className="btn" style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}>Submit</button>
        </Link>
      </div>
    </Container2>
  )
}

export default Registration;

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
    padding-right: 20px;
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
