export const calculateDimenstions = <T>(fields: T[]): [number, number] => {
  const totalFields = fields.length;
  console.log("totalFields:", totalFields);
  const maxCols = Math.max(...fields.map((field) => field?.column));
  const maxRows = Math.ceil(totalFields / maxCols);

  return [maxRows + 1, maxCols];
};
