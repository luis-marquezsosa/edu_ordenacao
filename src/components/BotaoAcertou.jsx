import React, { useState } from 'react';
import './BotaoAcertou.css'; // Certifique-se de criar este arquivo CSS na mesma pasta

function BotaoAcertou() {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  const handleClick = () => {
    setMostrarMensagem(true);
    setTimeout(() => {
      setMostrarMensagem(false);
    }, 4000); // Esconde a mensagem após 4 segundos
  };

  return (
    <div>
      <button onClick={handleClick}>Clique Aqui</button>
      {mostrarMensagem && <div className="mensagem">Você acertou!</div>}
    </div>
  );
}

export default BotaoAcertou;