import { Grid, Button, Paper } from "@mui/material";
import { KeypadProps } from "../types/key";

const Keypad = ({ keys, onClick }: KeypadProps) => {
  const columns = 5;

  return (
    <Paper
      sx={{
        height: "511px",
        borderRadius: "29px",
        backgroundColor: "#F3EEEE",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <Grid
        container
        columns={columns}
        rowGap={"16.5px"}
        columnGap={"16.5px"}
        sx={{ justifyContent: "center" }}
      >
        {keys.map((key, index) => (
          <Grid key={index} size={key.colWidth ? key.colWidth : 1}>
            <Button
              variant="text"
              disabled={key.value === ""}
              onClick={() => onClick(key.value)}
              data-cy={`keypad-btn-${key.value}`}
              sx={{
                width: "100%",
                height: "100%",
                padding: 0,
                fontSize: "40px",
                color: key.color ? key.color : "black",
                backgroundColor: key.bgColor ? key.bgColor : "transparent",
                borderRadius: "5px",
              }}
            >
              {key.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Keypad;
