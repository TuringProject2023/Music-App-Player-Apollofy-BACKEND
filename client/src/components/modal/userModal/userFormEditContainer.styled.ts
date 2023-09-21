import styled from "styled-components";

export const UserFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(to right ,hsl(300, 100%, 10%), #000);
  padding: 40px;
  border-radius: 10px;
  & .login {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
& .flex {
  display: flex;
  flex-direction: column;

&  .button_userForm {
  margin-top: 25px;
  margin-bottom: 6px;
  border-radius: 10px;
  border: none;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 19px;
  font-weight: bold;
  color: rgb(128, 128, 128);
  cursor: pointer;
}
& .button_delete {
  margin-top: 25px;
  margin-bottom: 6px;
  border-radius: 10px;
  border: none;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 19px;
  font-weight: bold;
  background-color: #f95959;
  color: rgb(14, 16, 19);
  cursor: pointer;
}
& .button_delete:hover {
  box-shadow: 2px 2px 12px white;
  color:#e4f1fe;
}


&  label {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 600;
  color:rgb(7, 7, 7)
}

& .button_userForm:hover {
  box-shadow: 2px 2px 12px white;
  color:#141010;
}
& .input {
  height: 30px;
  outline: none;
  padding: 15px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 12px inset black;
  background: linear-gradient(to right ,rgb(248, 97, 32),rgb(39, 40, 46));
}
& .input::placeholder {
    color: rgb(14, 16, 19);
  }
  .inpdut[type="file"] {
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  background-color:  rgb(134, 129, 134);
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}
.label_file {
  display:block;
  color: rgb(7, 7, 7);
  font-size: 1.5rem;
  font-weight: 600;
}
& .color {
  color:#f9637e;
}
& .error_input {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  width: 14rem;
  padding: 0.5rem 0 0 0 ;
  display: flex;
  align-items: center;
  color: #ff1100;
}
}
`