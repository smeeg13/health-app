import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function RedirectAlert(props) {
  return (
    <div className="center">
      <Stack sx={{ width: "100%" }} spacing={2} padding={1}>
        <Alert severity="warning">
          {props.IsAdmin ? (
            <>
              <AlertTitle> 
                <strong style={{color:"#054A2F"}}>You are not an Administrator</strong>
              </AlertTitle>
              Please log in as and Administrator before acessing this page, —
              <strong style={{color:"#054A2F"}}>You will be redirected in 5 seconds</strong>
            </>
          ) : (
            <>  
              {" "}
              <AlertTitle>
                <strong style={{color:"#054A2F"}}>You are not logged in</strong>
              </AlertTitle>
              Please log in before acessing this page, —
              <strong style={{color:"#054A2F"}}>You will be redirected in 5 seconds</strong>
            </>
          )}
        </Alert>
      </Stack>
    </div>
  );
}
