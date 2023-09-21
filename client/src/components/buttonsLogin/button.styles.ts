import styled from "styled-components";

export const ButtonLogin = styled.button`
  background: var( --background-button-shade-color);
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    font-size:4rem;
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
     background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .front {
    display: block;
    position: relative;
    padding: 8px 25px;
    border-radius: 12px;
    font-size: 1.5rem;
    color: #fafafa;
    background:var(--background-button-color);
    will-change: transform;
    transform: translateY(-4px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }
  &:hover {
    filter: brightness(110%);

  }
  &:hover .front {
    transform: translateY(-6px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }
  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }


`;

export const ButtonRedMediun = styled.button`
  font-size: 2rem;
  border: 1px solid #e85973;
  border-radius: 15px;
  background-color: #e85973;
  color: rgba(255, 255, 255, 0.9);
  width: 10rem;
  height: 4rem;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  a{
    color: rgba(255, 255, 255, 0.8);
  }
 
  &:hover {
    background-color: #e84050;
    transform: scale(1.05);
    opacity: 0.7;
    a{
    color: rgba(255, 255, 255, 0.9);
  }
  }
`;
