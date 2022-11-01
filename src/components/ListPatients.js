export function ListPatient(props) {
  return (
    <>
      <div className="container">
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {props.currentUser.list_patient.map((res) => (
            <li key={res}>
              <div className="row">
                <p>{res}</p>
                <button type="submit" className="btn">
                  See Details
                </button>
                <hr />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
