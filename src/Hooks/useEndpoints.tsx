import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

interface EndpointsProps {
  children: ReactNode;
}

interface POSTLOGINPROPS {
  email: string;
  password: string;
}

interface POSTREGISTERPROPS extends POSTLOGINPROPS {
  name: string;
}

interface UserFetch {
  data: UserType[];
}

export interface UserType {
  $id: string;
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  createdAt: string;
}

interface endpointsContextProps {
  POSTLOGIN: (POSTLOGINPROPS: POSTLOGINPROPS) => void;
  POSTREGISTER: (POSTREGISTERPROPS: POSTREGISTERPROPS) => void;
  GETUSERS: () => Promise<UserType[]>;
  isLogged: boolean;
  error: string[];
}

const endpointsContext = createContext<endpointsContextProps>({
  POSTLOGIN: async () => {},
  POSTREGISTER: async () => {},
  GETUSERS: async () => [],
  isLogged: false,
  error: []
});

export default function EndpointsProvider({ children }: EndpointsProps) {
  const [isLogged, setIsLogged] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [error, setError] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem('jwt');
    if (localToken) {
      setIsLogged(true);
      setToken(localToken);
    } else {
      setIsLogged(false);
    }
  }, []);

  async function POSTLOGIN({ email, password }: POSTLOGINPROPS) {
    const response = await fetch(
      'http://restapi.adequateshop.com/api/authaccount/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.status == 200 && data.code == 0) {
      setError([]);
      setToken(data.data.Token);
      localStorage.setItem('jwt', data.data.Token);
      setIsLogged(true);
      navigate('/users');
    } else {
      setToken('');
      setIsLogged(false);
      setError([...error, 'Falha ao fazer Login, usuário ou senha inválidos']);
      console.log(error);
    }
  }

  async function POSTREGISTER({ email, password, name }: POSTREGISTERPROPS) {
    const response = await fetch(
      'https://mywallet-app-backend.herokuapp.com/http://restapi.adequateshop.com/api/authaccount/registration',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      }
    );

    const { data } = await response.json();

    if ((response.status == 200 || response.status == 201) && data.code == 0) {
      setError([]);
      POSTLOGIN({ email, password });
    } else {
      setToken('');
      setIsLogged(false);
      setError([...error, 'O endereço de email enviado já está registrado']);
    }
  }

  async function GETUSERS() {
    const response = await fetch(
      'http://restapi.adequateshop.com/api/users?page=1',
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const { data }: UserFetch = await response.json();

    if (response.status == 200) {
      setError([]);
      return data;
    } else {
      setToken('');
      setIsLogged(false);
      return [];
    }
  }

  return (
    <endpointsContext.Provider
      value={{ POSTLOGIN, POSTREGISTER, GETUSERS, isLogged, error }}
    >
      {children}
    </endpointsContext.Provider>
  );
}

export function useEndpoints() {
  const context = useContext(endpointsContext);

  const { POSTLOGIN, POSTREGISTER, GETUSERS, isLogged, error } = context;

  return { POSTLOGIN, POSTREGISTER, GETUSERS, isLogged, error };
}
