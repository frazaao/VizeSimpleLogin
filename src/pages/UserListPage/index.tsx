import UserList from '../../components/UserList';
import { Main } from './styles';

export default function UserListPage() {
  return (
    <Main>
      <h1>Usuários:</h1>
      <UserList />
    </Main>
  );
}
