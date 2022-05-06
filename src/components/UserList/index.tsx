import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoints, UserType } from '../../Hooks/useEndpoints';
import { UsersTable } from './styles';
import { toast } from 'react-toastify';

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const { GETUSERS, isLogged } = useEndpoints();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      toast.error('Você não está logado, faça login primeiro');
      navigate('/');
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    GETUSERS().then((data) => {
      setUsers(data);
    });
  }, []);//eslint-disable-line

  return (
    <UsersTable>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })
        ) : (
          <h1>Carregando</h1>
        )}
      </tbody>
    </UsersTable>
  );
}
