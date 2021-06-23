import { Link } from 'react-router-dom';

import illustration from '../assets/imgs/illustration.svg';
import logo from '../assets/imgs/logo.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();

  return(
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua aundiência em tempo-real</p>
      </aside>
      <main>
        <h1>{user?.name}</h1>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <h2>Criar uma novo sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala" 
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}