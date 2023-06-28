import styled from '@emotion/styled';
import { Form } from 'formik';

export const FormAdd = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  padding: 16px;
  border: 2px solid black;
`;

export const Button = styled.button`
  width: 90px;
  max-height: 20px;
  cursor: pointer;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: white;

  transition: all ease-in 250ms;

  &:hover,
  &:focus {
    background-color: blue;
    color: white;
  }
`;
