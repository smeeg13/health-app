import { useContext, useState } from "react";
import { ThemeContext, themes } from "../../Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Historic from "../Historic";
import { ListPatient } from "../../components/ListPatients";

/**
 * Display the Home of a Doctor
 * 
 */
export default function HomeDocteur(props) {
    let themeContext = useContext(ThemeContext);
    const [showHistoric, setShowHistoric] = useState(false);
    const [patientToShow, setPatientToShow] = useState(undefined);
  
    const backToList = () => {
      setPatientToShow(undefined);
      setShowHistoric(false);
    };
  
    return (
      <div
        className="container"
        style={{
          backgroundColor: themes[themeContext.theme].background,
          color: themes[themeContext.theme].foreground,
        }}
      >
        {showHistoric ? (
          <div>
            <button
              startIcon={<ArrowBackIcon />}
              name="BackToList"
              type="submit"
              className="btn"
              style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}
              onClick={(event) => backToList()}
            >
              Back
            </button>
            <Historic currentUser={patientToShow} />
          </div>
        ) : (
          <div>
            <h2
              className="center hi"
              style={{
                color: themes[themeContext.theme].textcolor,
              }}
            >
              {" "}
              Welcome back Dr. {props.currentUser.nom}
            </h2>
            <ListPatient
              currentUser={props.currentUser}
              setShowHistoric={setShowHistoric}
              setPatientToShow={setPatientToShow}
            />
          </div>
        )}
      </div>
    );
  }
  

  

 