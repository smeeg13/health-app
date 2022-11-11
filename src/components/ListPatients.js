import { useEffect, useState, useContext } from "react";
import { GetUserById } from "../objects_managers/UserManager";
import { ThemeContext, themes } from "../Context";
import { DealWithPatientRequest } from "../objects_managers/DocteurManager";
import { BouncingDotsLoader } from "../utils/tools";
import RemarkDialog from "../utils/RemarkDialog";

/**
 * This function allow us to display the lists of patients that want us to be their doctor
 * And the list of our current patients
 * @param  {} props
 */
export function ListPatient(props) {
  let themeContext = useContext(ThemeContext);
  const [patients, setPatients] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [requestPatients, setRequestPatients] = useState([]);
  const [isBusy2, setBusy2] = useState(true);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      setPatients((prevUsers) => [...prevUsers, result]);
    };

    if (props.currentUser.list_patient.length !== 0) {
      props.currentUser.list_patient.forEach((project) => {
        fetchUser(project);
      });
      setBusy(false);
    }
  }, [props.currentUser.list_patient]);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      setRequestPatients((prevUsers) => [...prevUsers, result]);
    };

    if (props.currentUser.list_request_patient.length !== 0) {
      props.currentUser.list_request_patient.forEach((project) => {
        fetchUser(project);
      });
    }
    setBusy2(false);
  }, [props.currentUser.list_request_patient]);

  return (
    <>
      {isBusy && isBusy2 ? (
        <BouncingDotsLoader />
      ) : (
        <div className="container">
          <div className="box_list">
            <p
              className="center text"
              style={{
                color: themes[themeContext.theme].textcolor,
              }}
            >
              {" "}
              Here's a list of patients that asked you as their doctor.
              <br></br>
              You can accepte them or refuse them.
            </p>

            {requestPatients.length > 0 ? (
              <UserList
                currentUser={props.currentUser}
                patients={requestPatients}
                setPatients={setPatients}
                setRequestPatients={setRequestPatients}
                isRequest={true}
              />
            ) : (
              <p style={{ color: "#00A36C", fontStyle: "italic" }}>
                no request pending
              </p>
            )}
          </div>

          <div className="box_list">
            <h3
              style={{
                color: themes[themeContext.theme].textcolor,
                textAlign: "center",
              }}
            >
              {" "}
              Liste des patients
            </h3>
            {patients.length > 0 ? (
              <UserList
                currentUser={props.currentUser}
                patients={patients}
                setPatients={setPatients}
                setRequestPatients={setRequestPatients}
                isRequest={false}
                setShowHistoric={props.setShowHistoric}
                setPatientToShow={props.setPatientToShow}
              />
            ) : (
              <p style={{ color: "#00A36C", fontStyle: "italic" }}>
                No patients for the moment
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * This function allow us to actually display  one list
 * @param  {} props
 */
function UserList(props) {
  let themeContext = useContext(ThemeContext);

  const HandleClick = async (event, res) => {
    if (event.target.name === "Details") {
      console.log("Details Clicked on ", res.id_user);
      props.setPatientToShow(res);
      props.setShowHistoric(true);
    }
    if (event.target.name === "Accept") {
      await DealWithPatientRequest(props.currentUser, res.id_user, true);
      props.setRequestPatients((current) =>
        props.patients.filter((el) => el.id_user !== res.id_user)
      );
      props.setPatients((prevUsers) => [...prevUsers, res]);
    }
    if (event.target.name === "Refuse") {
      await DealWithPatientRequest(props.currentUser, res.id_user, false);
      props.setRequestPatients((current) =>
        props.patients.filter((el) => el.id_user !== res.id_user)
      );
    }
  };
  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 10 }}>
        {props.patients.map((res) => (
          <li
            className="text"
            style={{
              color: themes[themeContext.theme].textcolor,
            }}
            key={res.id_user}
          >
            <div className="row  center">
              <div className="column_list">
                <p
                  className="center"
                  style={{ marginLeft: "120px", fontSize: "1.2em" }}
                >
                  {res.nom !== "" ? res.nom : res.email}
                </p>
              </div>
              <div className="column_list center">
                {props.isRequest ? (
                  <div style={{ marginLeft: "100px" }}>
                    <button
                      name="Accept"
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                        marginTop: 0,
                        marginBottom: 10,
                        marginRight: 10,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      Accept{" "}
                    </button>
                    <button
                      name="Refuse"
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                        marginTop: 0,
                        marginBottom: 10,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      Refuse{" "}
                    </button>
                  </div>
                ) : (
                  <>
                    <RemarkDialog
                      user={res}
                      nomDocteur={props.currentUser.nom}
                    />
                    <button
                      name="Details"
                      type="submit"
                      className="details_btn"
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      Details
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
