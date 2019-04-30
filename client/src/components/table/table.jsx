import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  border-collapse: collapse;
  margin: 1rem auto;
  padding: 1rem;
  th td {
    vertical-align: middle;
    text-align: left;
  }
  th {
    background-color: var(--table-header-color);
    color: var(--secondary-text-color);
    padding: 1rem;
  }
  td {
    font-size: .9rem;
    padding: .5rem;
  }
  tr:nth-child(odd) {
    background-color: var(--third-background-color);
  }
`;

export default Table;