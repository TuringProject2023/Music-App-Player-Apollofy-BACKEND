import styled from "styled-components";

export const UserDeleteContainer = styled.div`
  background: var(--color-background-main);
  border-radius: 8px;

& .modal_content {
  text-align: center;

  &  h2 {
  padding: 12px 0;
  font-size: 2rem;
  color: #f5f4e8;
  font-weight: 600;

}

&  p {
  padding-bottom: 5px;
  font-size: 1.4rem;
  color: #dafcc4;
  font-weight: 600;

}

/* Estilos de los botones */
& .button_container {
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
}

& .confirm_button,
.cancel_button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

& .confirm_button {
  background-color: #e74c3c;
  color: #f5f4e8;
  font-size: 1.2rem;
}

& .confirm_button:hover {
  background-color: #c0392b;
}

& .cancel_button {
  background-color: #2f9304;
  color: #f5f4e8;
  font-size: 1.2rem;
}

& .cancel_button:hover {
  background-color: #077107;
}
}
`