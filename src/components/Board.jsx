import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import BotaoAcertou from './BotaoAcertou';

export default function Board() {
    const [palavra, setPalavra] = useState([]);

    const listaPalavras = [
        { userId: 1, id: 1, title: 'Luis Felipe', ordem: 0, imagem: 4 },
        { userId: 2, id: 2, title: 'Vivian Louise', ordem: 1, imagem: 1 },
        { userId: 3, id: 3, title: 'Ana Paula', ordem: 2, imagem: 15 },
        { userId: 4, id: 4, title: 'Cintia', ordem: 3, imagem: 12 },
        { userId: 5, id: 5, title: 'Luis Antonio', ordem: 4, imagem: 2},
        { userId: 6, id: 6, title: 'Miguel', ordem: 5, imagem: 5 },
        { userId: 7, id: 7, title: 'Vitor', ordem: 6, imagem: 7 },
        { userId: 8, id: 8, title: 'Rosa Maria', ordem: 7, imagem: 6 },
        { userId: 9, id: 9, title: 'Ivana', ordem: 8, imagem: 10 },
        { userId: 10, id: 10, title: 'Adílio', ordem: 9, imagem: 14 },
      ];

    useEffect(() => {

        setPalavra(listaPalavras);
        console.log("useEffect");

    }, []);

    const handleDragEnd = (result) => {

        //Quebra o array nos objetos
        const { destination, source, draggableId } = result;
        
        //Se não mudou de lugar não faz nada
        if (!destination || source.index === destination.index) return;

        //Muda de posição e ordena pelo campo ordem
        const novaLista = palavra.map(item => {
            if (source.index < destination.index) {
                if (item.ordem === source.index) {
                    return {...palavra.find(x => x.ordem === item.ordem), ordem: destination.index};
                } else if (item.ordem >  source.index && item.ordem <= destination.index) {
                    return {...palavra.find(x => x.ordem === item.ordem), ordem: item.ordem-1};
                }                
            } else {
                if (item.ordem === source.index) {
                    return {...palavra.find(x => x.ordem === item.ordem), ordem: destination.index};
                } else if (item.ordem >=  destination.index && item.ordem < source.index) {
                    return {...palavra.find(x => x.ordem === item.ordem), ordem: item.ordem+1};
                }                
            }

            return item;
            });

        //Atualiza o Redux com os dados reordenados
        setPalavra(novaLista.sort((a, b) => a.ordem - b.ordem));

    };
    function verificarOrdenacaoComMap(array) {
        // Usamos map para criar um array de booleanos, onde cada elemento indica se o elemento atual é menor ou igual ao próximo
        const comparacoes = array.map((valor, indice, arr) => {
          // Evitamos comparar o último elemento, que não tem um "próximo" elemento
          if (indice < arr.length - 1) {
            return valor <= arr[indice + 1];
          } else {
            return true; // O último elemento é considerado "ordenado" por padrão, já que não tem um próximo com o qual comparar
          }
        });
      
        // Verificamos se todas as comparações resultaram em true
        const estaOrdenado = comparacoes.every(valor => valor === true);
      
        return estaOrdenado;
      }
 
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>PAINEL DE GESTÃO</h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1300px",
                    margin: "0 auto"
                }}
            >
                <Column title={"Palavras"} tasks={palavra} id={"2"} />
            </div>
            <div>
            <BotaoAcertou />
            </div>
       </DragDropContext>
    );
}

        //destination.droppableId -> é a posição da coluna
        //destination.index -> é a posição do cartão
        //draggableId -> id do objeto
        // const novaLista = ordenaMaiorMenor(source.index, destination.index, ...palavra);


        // //Muda de posição e ordena pelo campo ordem
        // const novaLista = palavra.map(item => {
        //     if (item.ordem === destination.index) {
        //       return {...palavra.find(x => x.ordem === item.ordem), ordem: source.index};
        //     } else if (item.ordem === source.index) {
        //       return {...palavra.find(x => x.ordem === item.ordem), ordem: destination.index};
        //     }
        //     return item;
        //   }).sort((a, b) => a.ordem - b.ordem);

        // console.log("Antes de ordenar");
        // console.log(novaLista.sort((a, b) => a.ordem - b.ordem));
        // const novaLista = listaPalavras.map(item => {
        // if (item.ordem === 1) {
        //     return {...listaPalavras.find(x => x.ordem === 4), ordem: 1};
        // } else if (item.ordem === 4) {
        //     return {...listaPalavras.find(x => x.ordem === 1), ordem: 4};
        // }
        // return item;
        // });