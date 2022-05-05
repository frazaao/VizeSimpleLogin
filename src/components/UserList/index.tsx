import { UsersTable } from './styles';

export default function UserList() {
  return (
    <UsersTable>
      <thead>
        <th>ID</th>
        <th>Nome</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>User 1</td>
        </tr>
      </tbody>
    </UsersTable>
  );
}
