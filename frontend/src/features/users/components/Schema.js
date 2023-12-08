import * as Yup from 'yup';
/* eslint-disable import/prefer-default-export */

export const validateLoginSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is required.'),
  password: Yup.string().required('This field is required.'),
});

export const validateCreateSchema = Yup.object().shape({
  first_name: Yup.string().required('This field is required.'),
  last_name: Yup.string().required('This field is required.'),
  email: Yup.string().email().required('This field is required.'),
  password: Yup.string().required('This field is required.'),
});
