import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect, useContext } from "react";
import { SaveOneFieldInDB } from "../utils/tools";
import { ThemeContext, themes } from "../Context";

export default function RemarkDialog(props) {
  let themeContext = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [remarkString, setRemarkString] = useState("");
  const [confirmSave, setConfirmSave] = useState("");

  useEffect(() => {
    setTimeout(() => {
      //reset the remark & the confirm msg and close
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
      //Save into user into DB
      await SaveOneFieldInDB(
        props.user.id_user,
        "remarks",
        remarkToSave,
        false
      );
      //If ok then show ok msg for 3sec
      setConfirmSave("Changements Sauvegardés");
    } catch (e) {
      //If nok, then show nok msg but stay open
      setConfirmSave("Erreur, merci de réessayer plus tard");
    }
  };

  return (
    <>
      <button className="remark_btn" style={{backgroundColor:"#77C5A6",}}
        onClick={handleClickOpen}
      >
        Send a remark
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remark for {props.user.nom}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Entrez vos remarques ci-dessous</DialogContentText> */}
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
