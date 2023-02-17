import styled from "styled-components";

export const Label = styled.label`
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  color: #262626;
`;

export const ErrorMessage = styled.div`
  height: 18px;
  margin-top: -14px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  line-height: 17.95px;
  color: red;
`;

export const Input = styled.input<{ isValid: boolean }>`
  padding: 14px 13px;
  box-sizing: border-box;
  margin: 19px 0px;
  width: 345px;
  height: 40px;
  border-radius: 10px;
  outline: none;
  border:${(props) => (props.isValid ? "1px solid #eeeeee;" : "1px solid red;")}
  background: #f4f4f4;
  font-family: "Futura";
  font-weight: 500;
  font-size: 16px;
  line-height: 20.51px;
  color: #6d6d6d;

  &:hover{
    border: 1px solid #3300cc;
  }
`;

export const MainForm = styled.form`
  width: 345px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
