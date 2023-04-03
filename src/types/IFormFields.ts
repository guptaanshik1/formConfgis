export interface IFormFields {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  mandatory: boolean;
  identifier: string;
  editable: boolean;
  placeholder: string;
  row: number;
  column: number;
  rowSpan: number;
  colSpan: number;
}
