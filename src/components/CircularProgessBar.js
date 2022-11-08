
import PropTypes from "prop-types";
import { ThemeContext, themes } from "../Context";
import React, { useContext } from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  let themeContext = useContext(ThemeContext);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress style={{color: themes[themeContext.theme].rangeToggle,
        }}
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
      style={{color: themes[themeContext.theme].rangeColor,
        }}
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
      <Box 
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary"  style={{color: themes[themeContext.theme].backgroundresult}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularProgressBar(props) {
  const [progress, setProgress] = React.useState(props.progress);

  React.useEffect(() => {
    setProgress(props.progress);
  }, [props.progress]);

  return <CircularProgressWithLabel value={progress} />;
}
