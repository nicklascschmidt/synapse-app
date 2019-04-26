import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--primary-element-color);
  color: white;
  border: none;
  border-radius: 5px;
  padding: .5rem 1rem;
  margin: .8rem;
  :hover {
    background-color: var(--secondary-element-color);
  }
`;

export default Button;