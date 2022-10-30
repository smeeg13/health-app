import { useEffect, useState, useContext } from "react";
import { GetUserById } from "../objects_managers/UserManager";
import { Loader } from "./QuestionForm";
import { ThemeContext, themes } from "../Context";
import { DealWithPatientRequest } from "../objects_managers/DocteurManager";

export function ListPatient(props) {
  const [patients, setPatients] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [requestPatients, setRequestPatients] = useState([]);
  const [isBusy2, setBusy2] = useState(true);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      console.log("User retrived :", result);
      setPatients((prevUsers) => [...prevUsers, result]);
      setBusy(false);
    };

    props.currentUser.list_patient.forEach((project) => {
      fetchUser(project);
    });
  }, [props.currentUser.list_patient]);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      console.log("User requested retrived :", result);
      setRequestPatients((prevUsers) => [...prevUsers, result]);
      setBusy2(false);
    };
    if (props.currentUser.list_request_patient !== undefined) {
      props.currentUser.list_request_patient.forEach((project) => {
        fetchUser(project);
      });
    }
  }, [props.currentUser.list_request_patient]);

  return (
    <>
      {isBusy && isBusy2 ? (
        <Loader />
      ) : (
        <div className="container_list_patient">
          <div className="box_list">
            <h3> Patients that asked us to be our doctor </h3>
            <p>you can accepte them or refuse them</p>

            <UserList
              currentUser={props.currentUser}
              patients={requestPatients}
              isRequest={true}
            />
          </div>
          <hr />
          <div className="box_list">
            <h3> List of Patients</h3>

            <UserList
              currentUser={props.currentUser}
              patients={patients}
              isRequest={false}
              setShowHistoric={props.setShowHistoric}
              setPatientToShow={props.setPatientToShow}
            />
          </div>
        </div>
      )}
    </>
  );
}

function UserList(props) {
  let themeContext = useContext(ThemeContext);

  const HandleClick = async (event, res) => {
    if (event.target.name === "Details") {
      console.log("Details Clicked on ", res.id_user);
      //TODO :: Open the historic of the client with the last result display in the bottom
      props.setPatientToShow(res);
      props.setShowHistoric(true);
    }
    if (event.target.name === "Accept") {
      console.log("Accept Clicked on ", res.id_user);
      //TODO :: transfer the id from list_request to list_patient
      //AND into user put into doctor_assigned the id of doc
      //AND remove id into doctor_request
      //then save it all into DB

      await DealWithPatientRequest(props.currentUser, res.id_user, true)
    }
    if (event.target.name === "Refuse") {
      console.log("Refuse Clicked on ", res.id_user);
      //TODO :: delete the id from list_request
      //AND remove id into doctor_request
      //AND add into remarks field : that the doctor refuses, must choose another one
      //then save it all into DB

      await DealWithPatientRequest(props.currentUser, res.id_user, false)
    }
  };

  return (
    <div className="container_list_patient center">
      {props.patients.lenght === 0 ? (
        <div>
          {props.isRequest ? (
            <p>no request pending</p>
          ) : (
            <p>No patients for the moment</p>
          )}
        </div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 10 }}>
          {props.patients.map((res) => (
            <li key={res.id_user}>
              <hr className="my_hr" />

              <div className="row  center">
                <div className="column_list center">
                  <p className="center">
                    {res.nom !== "" ? res.nom : res.email}
                  </p>
                </div>
                <div className="column_list center">
                  {props.isRequest ? (
                    <div>
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
                    <button
                      name="Details"
                      type="submit"
                      className="btn "
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                        width: 170,
                        marginTop: 0,
                        marginBottom: 10,
                        marginLeft: 280,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      See Details
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
