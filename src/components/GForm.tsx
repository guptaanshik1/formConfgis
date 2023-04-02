import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import { IFormFields } from "../types/IFormFields";
import { calculateDimenstions } from "../utils/calculateDimensions";
import { CFormikField, CFormikForm } from "./ChakraFormik";

interface IProps {
  formFields: IFormFields[];
  initialValues: {};
  validationSchema: {};
  btnText: string;
  onSubmit: () => void;
}

const GForm = ({
  formFields,
  initialValues,
  validationSchema,
  btnText,
  onSubmit,
}: IProps) => {
  const [maxRows, maxCols] = calculateDimenstions(formFields);
  console.log(maxRows, maxCols);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleSubmit }: FormikProps<any>) => {
        return (
          <CFormikForm>
            {Array.from({ length: maxRows }, (_, i) => i).map((row) => {
              return (
                <SimpleGrid columns={maxCols}>
                  {formFields
                    .filter((currentField) => currentField.row === row + 1)
                    .map((formField) => {
                      return (
                        <Field key={formField?.id} name={formField?.identifier}>
                          {({ field, form }: { field: any; form: any }) => {
                            return (
                              <FormControl isRequired={formField?.mandatory}>
                                <FormLabel>{formField?.label}</FormLabel>
                                <Input
                                  {...field}
                                  id={formField?.id}
                                  name={formField?.identifier}
                                  onChange={form.handleChange}
                                  value={values[formField?.identifier]}
                                  type={formField?.type}
                                  isReadOnly={!formField?.editable}
                                />
                              </FormControl>
                            );
                          }}
                        </Field>
                      );
                    })}
                </SimpleGrid>
              );
            })}
          </CFormikForm>
        );
      }}
    </Formik>
  );
};

export default GForm;
