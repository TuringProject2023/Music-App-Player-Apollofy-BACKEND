import styled from "styled-components";

export const MessageSuccessContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: system-ui, "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif;
  width: 320px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background: #84d65a;
  border-radius: 8px;
  box-shadow: 0px 0px 5px -3px #111;

  & .success span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #000000;
  }
  & .success__icon {
    width: 20px;
    height: 20px;
    transform: translateY(-2px);
    margin-right: 8px;
  }

  & .success__icon path {
    fill: #393a37;
  }

  & .success__title {
    font-weight: 500;
    font-size: 14px;
    color: #393a37;
  }

  & .success__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }

  & .success__close path {
    fill: #393a37;
  }
`;
