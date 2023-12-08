import * as Yup from 'yup';
/* eslint-disable import/prefer-default-export */
export const validateSchema = Yup.object().shape({
  task: Yup.string().required('This field is required.'),
  due_date: Yup.string().required('This field is required.'),
  completed: Yup.boolean(),
});
