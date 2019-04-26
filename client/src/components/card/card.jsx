import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--secondary-background-color);
  border: none;
  border-radius: 8px;
  padding: 1rem;
  margin: ${props => props.margin || '.5rem'};
  width: ${props => props.width || null};
`;

export default Card;
