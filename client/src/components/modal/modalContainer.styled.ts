import styled from "styled-components";

export const ModalContainer = styled.article`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: clamp(50vw, 100%, 100%);
  min-height: 100vh;
  background-color: rgb(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    position: relative;
    padding: 1rem;
    width: clamp(200px, 50rem, 400px);
    min-height: 200px;
    /* max-height: 500px; */
    overflow-y: auto;

    &_close_button {
      position: absolute;
      top: 2rem;
      right: 2rem;
      cursor: pointer;
      color: brown;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(0, 0, 0, 0.75);
      border-radius: 5px;
      will-change: transform;
      transform: translateY(-3px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
      .front {
        display: block;
        position: relative;
        padding: 2px;
        border-radius: 5px;
        font-size: 1.5rem;
        color: #fafafa;
        background: var(--color-text-gray);
        will-change: transform;
        transform: translateY(-3px);
        transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
      }
      &:hover {
        filter: brightness(110%);
      }
      &:hover .front {
        transform: translateY(-5px);
        transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
      }
      &:active .front {
        transform: translateY(-1px);
        transition: transform 34ms;
      }
    }
    /* ._clsoe_button {
      display: block;
      position: relative;
      padding: 8px 25px;
      border-radius: 12px;
      font-size: 1.5rem;
      color: #fafafa;
      background: var(--background-button-cancel-color);
      will-change: transform;
      transform: translateY(-4px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    } */
  }
`;
