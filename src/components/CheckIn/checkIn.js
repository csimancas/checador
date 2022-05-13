import React, { useState } from "react";
import { TopAppBar } from "../AppBar/AppBar";
import { StyleButton } from "../StyleButton/StyleButton";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Check, ArrowUpward } from "@mui/icons-material";
import * as turf from "@turf/turf";
import { useSelector } from "react-redux";
import { userState } from "../../redux/slices/userSlice";

const schoolUbication = {
  accuracy: 35,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 21.461395908291873,
  longitude: -104.83485490545178,
  speed: null,
};

const buttonStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 64,
    display: "block",
  },
}));

const CheckIn = () => {
  const user = useSelector(userState);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [distance, setDistance] = useState(0);

  const classes = buttonStyles();

  const getUbication = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(parseFloat(position.coords.longitude));
      setLatitude(parseFloat(position.coords.latitude));
    });
    let to = turf.point([
      parseFloat(schoolUbication.longitude),
      parseFloat(schoolUbication.latitude),
    ]);
    let from = turf.point([longitude, latitude]);
    let options = { units: "kilometers" };

    let getDistance = turf.distance(from, to, options);
    setDistance(getDistance);
  };

  return (
    <>
      <TopAppBar />
      <div>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <StyleButton name={"Registrar entrada"} action={getUbication}>
            <Check className={classes.icon} />
          </StyleButton>
          <StyleButton name={"Registrar Salida"}>
            <ArrowUpward className={classes.icon} />
          </StyleButton>
          <button
            type="button"
            label="imprimir"
            onClick={() => console.log(user)}
          />
        </Grid>
      </div>
    </>
  );
};

export { CheckIn };
