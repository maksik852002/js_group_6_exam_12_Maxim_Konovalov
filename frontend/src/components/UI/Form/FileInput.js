import React, { createRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  btn: {
    position: "absolute",
    top: "4px",
    right: "4px",
    height: "55px",
    width: "20%",
  },
});

const FileInput = ({ onChange, name, label, error }) => {
  const classes = useStyles();

  const inputRef = createRef();

  const [filename, setFilename] = useState("");

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }

    onChange(e);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ position: "relative" }}
      >
        <Grid item xs>
          <TextField
            variant="outlined"
            disabled
            fullWidth
            label={label}
            value={filename}
            onClick={activateInput}
            error={!!error}
            helperText={error}
          />
        </Grid>

        <Button
          className={classes.btn}
          variant="contained"
          onClick={activateInput}
        >
          Browse
        </Button>
      </Grid>
    </>
  );
};

export default FileInput;
