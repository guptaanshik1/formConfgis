export interface IFormFields {
  id: string;
  label: string;
  type: "TEXT" | "EMAIL";
  mandatory: boolean;
  identifier: string;
  editable: boolean;
  placeholder: string;
  row: number;
  column: number;
}
