import { SxProps } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

export const HistoryIcon = ({ sx }: { sx: SxProps }) => {
  return (
    <SvgIcon fontSize="large" sx={sx}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="15" fill="#F3EEEE" />
        <line
          x1="12.95"
          y1="8.63116"
          x2="12.95"
          y2="16.6327"
          stroke="#7A7777"
          strokeLinecap="round"
        />
        <line
          x1="20.9565"
          y1="17.1463"
          x2="12.9553"
          y2="17.2323"
          stroke="#7A7777"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
};
