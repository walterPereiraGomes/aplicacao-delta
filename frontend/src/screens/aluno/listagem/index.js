import React from 'react';
import { useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import { getAlunos, deleteAluno } from '../../../services/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Listagem() {
  
  const history = useHistory();
  function goToCadastro() {
    history.push("/cadastro");
  }
  
  function excluirAluno () {
    confirmAlert({
      title: 'Exclusão de Aluno',
      message: 'Tem certeza que deseja excluir esse aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            deleteAluno();
          }
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    });
  };

  function findAlunos() {
    const alunos = getAlunos();
    console.log(alunos);
  }

  function editar(idAluno) {
    history.push(`/editar/${idAluno}`);
  }

  const alunos = [
    {
      id: 0,
      nome: "Walter",
      endereco: "Rua 1",
      foto: "abc"
    },
    {
      id: 1,
      nome: "Matheus",
      endereco: "Rua 2",
      foto: "abc"
    }
  ]
  
  return (
    <div className="container-listagem">
      <Button className="margin-bottom" variant="secondary" type="button" onClick={findAlunos}>
        alunos
      </Button>
      <Button className="margin-bottom" variant="secondary" type="button" onClick={goToCadastro}>
        Cadastrar novo Aluno
      </Button>
      <div className="table-listagem">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th className="teste">Ações</th>
            </tr>
          </thead>
          <tbody>
            { alunos.length > 0
              ? alunos.map(aluno => {
                return (
                  <tr>
                    <td>{aluno.foto}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.endereco}</td>
                    <td className="flex-space-between">
                      <Button size="sm" onClick={() => {editar(aluno.id)}}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={excluirAluno}>Excluir</Button>
                    </td>
                  </tr>
                )
              }) : <div></div>
            }
          </tbody>
        </Table>
      </div>

    </div>
  )
};

export default Listagem;