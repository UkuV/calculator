export interface Key {
  label: string | JSX.Element;
  value: string;
  color?: string;
  bgColor?: string;
  colWidth?: number;
}
export interface KeypadProps {
  keys: Key[];
  onClick: (keyValue: string) => void;
}
