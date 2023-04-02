import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import { IFormFields } from "../types/IFormFields";
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleSubmit }: FormikProps<any>) => {
        return (
          <CFormikForm>
            {formFields?.map((field) => {
              // console.log("field:", field);
              return (
                <Field key={field?.id}>
                  {({ field, form }) => {
                    console.log("field:", field);
                    return (
                      <FormControl
                        isRequired={field?.mandatory}
                        gridColumn={field?.column}
                        gridRow={field?.row}
                      >
                        <FormLabel>{field.label}</FormLabel>
                        <Input
                          {...field}
                          id={field?.identifier}
                          type={field?.type}
                          isReadOnly={!field?.editable}
                        />
                      </FormControl>
                    );
                  }}
                </Field>
              );
            })}
          </CFormikForm>
        );
      }}
    </Formik>
  );
};

export default GForm;
