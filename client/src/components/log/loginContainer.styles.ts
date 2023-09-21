import styled from "styled-components";
import backGroundImage from "../../assets/img/Crowd.webp";

export const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  background-image: url(${backGroundImage});
  background-color: red;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .blur-div{
    backdrop-filter: blur(2px);
  }
  

  & .logincontainer__h2 {
    color: #000;
    font-size: 3rem;
    
  }
  & div {
    
  }
.logincontainer__div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input{
    
  }
}
  & label {
    color: #e85973;
    font-size: 2rem;
  }
  .btn-log-in{
    margin: 3rem;
    background-color: #e85973;
    color: #fff;
    padding: 1rem;
    border: 1px solid #e85973;
    border-radius: 1.5rem;
    width: 75%;
    cursor: pointer;
    &:hover{
      background-color: #e85060;
    }
  }
`;
