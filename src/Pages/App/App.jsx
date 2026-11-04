import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import ApresentacaoModal from '../../components/ApresentacionModal/ApresentacaoModal.jsx';

const API_URL = 'http://localhost:5021';

export default function App() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function verificarStatusModal() {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setCarregando(false);
        return; 
      }

      try {
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        const resposta = await axios.get(`${API_URL}/apresentacao/status`, config);
        
        const jaViu = resposta.data?.viuApresentacao;

        if (jaViu === false || jaViu === 0 || jaViu === '0') {
          setMostrarModal(true);
        }
      } catch (error) {
        console.error("Erro ao checar status no backend:", error);
      } finally {
        setCarregando(false);
      }
    }

    verificarStatusModal();
  }, []);

  function fecharModalNaTela() {
    setMostrarModal(false);
  }

  if (carregando) {
    return <div className="App">Carregando...</div>;
  }

  return (
    <div className="App">
      {mostrarModal && <ApresentacaoModal onComplete={fecharModalNaTela} />}
    </div>
  );
}