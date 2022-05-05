import styled from 'styled-components';

export const Submit = styled.button`
  cursor: pointer;
  background-color: #00639c;
  padding: 0.625rem 1.5rem;
  border-radius: 100px;
  border: none;
  color: white;
  font-family: 'Roboto', Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.1px;
  min-height: 2.5rem;
  min-width: 16.25rem;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  input {
    min-width: 24rem;
  }
  a > button {
    width: 19.75rem;
  }
`;
