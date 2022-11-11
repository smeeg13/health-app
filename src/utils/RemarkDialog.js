import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { SaveOneFieldInDB } from "./tools";

/**
 * This Component allow us to an alert that allows the doctor to send a remark to one of his patient
 */
export default function RemarkDialog(props) {

  const [open, setOpen] = useState(false);
  const [remarkString, setRemarkString] = useState("");
  const [confirmSave, setConfirmSave] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setConfirmSave("");
      setRemarkString("");
      setOpen(false);
    }, 3000);
  }, [confirmSave]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (event) => {
    setRemarkString(event.target.value);
  };

  const handleSubmitRemark = async () => {
    try {
      console.log("Submit Clicked with value final : ", remarkString);
      let remarkToSave = remarkString + " - From Dr. " + props.nomDocteur;
      await SaveOneFieldInDB(
        props.user.id_user,
        "remarks",
        remarkToSave,
        false
      );
      setConfirmSave("Changements Sauvegardés");
    } catch (e) {
      setConfirmSave("Erreur, merci de réessayer plus tard");
    }
  };

  return (
    <>
     <button className="remark_btn" style={{backgroundColor:"#77C5A6", borderRadius:"20px", height:"30px"}}
        onClick={handleClickOpen}
      >
        Send a remark
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remark for {props.user.nom}</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChanges}
            value={remarkString}
            autoFocus
            margin="dense"
            id="remarks"
            label="Your remarks"
            type="text"
            placeholder="Description ..."
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <div>
          {confirmSave === "Changements Sauvegardés" ? (
            <span style={{ color: "#00A36C", margin: 0 }}>{confirmSave}</span>
          ) : (
            <span style={{ color: "#FF2400", margin: 0 }}>{confirmSave}</span>
          )}
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitRemark}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
