import React from 'react';
import { useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

// import { Container } from './styles';
function Listagem() {
  
  const history = useHistory();
  function goToCadastro() {
    history.push("/cadastro");
  }

  const alunos = [
    {
      nome: "Walter",
      endereco: "Rua 1",
      foto: "abc"
    },
    {
      nome: "Matheus",
      endereco: "Rua 2",
      foto: "abc"
    }
  ]
  
  return (
    <div className="container-listagem">
      <Button variant="secondary" type="button" onClick={goToCadastro}>
        Cadastrar novo Aluno
      </Button>
      <br/>
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
                      <Button size="sm">Editar</Button>
                      <Button variant="danger" size="sm">Excluir</Button>
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