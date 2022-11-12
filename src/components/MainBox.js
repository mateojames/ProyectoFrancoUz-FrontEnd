import React, { useState, useEffect } from "react"
import { Paper, Box } from "@mui/material";

export default function MainBox(props) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Box sx={{display: 'flex', alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>
      <Paper elevation={10} 
          style={{display: 'flex',  flexDirection: props.flexDirection,alignContent:'center', justifyContent: 'center', alignItems: 'center', height: 0.9*windowSize.innerHeight, width: 0.95*windowSize.innerWidth}}
          sx={{margin:1}}
        >
        {props.children}
      </Paper>
    </Box>
  )
}
