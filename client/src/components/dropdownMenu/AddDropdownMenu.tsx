import { FC } from 'react';
import styled from 'styled-components';
import { HiPlus } from "react-icons/hi";
interface DropdownMenuProps {
  openModal1: () => void;
  isDropdownVisible: boolean;

}

export const AddDropdownMenu: FC<DropdownMenuProps> = ({ isDropdownVisible, openModal1 }) => {

  return (
    <>
      <DropdownMenuContentADD className={isDropdownVisible ? 'visible' : ''}>
        <button onClick={openModal1} type='button' className='value'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          CREATE
        </button>

      </DropdownMenuContentADD>
    </>
  )
}

const DropdownMenuContentADD = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  background-color: #0D1117;
  justify-content: center;
  border-radius: 5px;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  position: absolute;
  top: calc(100% + -5px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .value {
    background-color: transparent;
    border: none;
    padding: 10px;
    color: white;
    display: flex;
    position: relative;
    gap: 5px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .value:not(:active):hover,
  .value:focus {
    background-color: #21262C;
  }
  
  .value:focus,
  .value:active {
    background-color: #1A1F24;
    outline: none;
  }
  
  .value::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
    width: 5px;
    height: 80%;
    background-color: #2F81F7;
    border-radius: 5px;
    opacity: 0;
  }
  
  .value:focus::before,
  .value:active::before {
    opacity: 1;
  }
  
  .value svg {
    width: 15px
  }
  
  .input:hover > :not(.value:hover) {
    transition: 300ms;
    filter: blur(1px);
    transform: scale(0.95,0.95);
  }
`