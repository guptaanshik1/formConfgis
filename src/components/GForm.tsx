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
  styleProps?: {
    formStyles?: {};
    labelStyles?: {};
    fieldStyles?: {};
    buttonStyles?: {};
  };
}

const GForm = ({
  formFields,
  initialValues,
  validationSchema,
  btnText,
  onSubmit,
  styleProps,
}: IProps) => {
  const [maxRows, maxCols] = calculateDimenstions(formFields);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleSubmit }: FormikProps<any>) => {
        return (
          <CFormikForm style={styleProps?.formStyles} onSubmit={handleSubmit}>
            {Array.from({ length: maxRows }, (_, i) => i).map((row) => {
              return (
                <SimpleGrid columns={maxCols} gap={"10px"}>
                  {formFields
                    .filter((currentField) => currentField.row === row + 1)
                    .map((formField) => {
                      return (
                        <Field key={formField?.id} name={formField?.identifier}>
                          {({ field, form }: { field: any; form: any }) => {
                            return (
                              <FormControl
                                isRequired={formField?.mandatory}
                                isInvalid={
                                  errors[formField?.identifier] &&
                                  form.touched[formField?.identifier]
                                }
                                gridColumn={`span ${formField?.colSpan}`}
                                gridRow={`span ${formField?.rowSpan}`}
                              >
                                <FormLabel style={styleProps?.labelStyles}>
                                  {formField?.label}
                                </FormLabel>
                                <Input
                                  {...field}
                                  style={styleProps?.fieldStyles}
                                  id={formField?.id}
                                  name={formField?.identifier}
                                  onChange={handleChange}
                                  value={values[formField?.identifier]}
                                  type={formField?.type}
                                  isReadOnly={!formField?.editable}
                                  placeholder={formField?.placeholder}
                                />
                                <FormErrorMessage>
                                  {(errors[formField?.identifier] as string) ??
                                    ""}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        </Field>
                      );
                    })}
                </SimpleGrid>
              );
            })}
            <Button type="submit" style={styleProps?.buttonStyles}>
              Sign up
            </Button>
          </CFormikForm>
        );
      }}
    </Formik>
  );
};

export default GForm;
