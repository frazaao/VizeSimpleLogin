import styled from 'styled-components';

export const UsersTable = styled.table`
  font-family: 'Roboto', Arial, sans-serif;
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: #cce5ff;
    color: #00639c;
    th {
      border: 2px solid #cce5ff;
      padding: 0.875rem;
    }
    th:last-child {
      text-align: left;
    }
  }

  tbody {
    tr {
      td {
        padding: 0.875rem;
        border-left: 2px solid #cce5ff;
        border-right: 2px solid #cce5ff;
      }
      td:first-child {
        text-align: center;
      }
    }

    tr:last-child {
      td {
        border-bottom: 2px solid #cce5ff;
      }
    }
  }
`;
