import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, DropdownButton, Button, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';
import { getAlunos, deleteAluno } from '../../../services/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Create, DeleteOutline, Visibility } from '@material-ui/icons';

function Listagem() {

  const history = useHistory();
  const [alunos, setAlunos] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
      findAlunos();
  },[]);

  function goToCadastro() {
    history.push("/cadastro");
  }
  
  async function excluirAluno (idAluno) {
    confirmAlert({
      title: 'Exclusão de Aluno',
      message: 'Tem certeza que deseja excluir esse aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await deleteAluno(idAluno);
            findAlunos();
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
    getAlunos().then((a) => {
      setAlunos(a)
    })
  }

  function visualizarFoto(idAluno){
    handleShow();
    console.log(idAluno);
  }

  function editar(idAluno) {
    history.push(`/editar/${idAluno}`);
  }
  
  return (
    <div className="container-listagem">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Visualização do aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>aki vai fica a foto</span>
        </Modal.Body>
      </Modal>
      <Button className="margin-bottom" type="button" onClick={goToCadastro}>
        Cadastrar novo Aluno
      </Button>
      <div className="table-listagem">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="sizeColButton">Foto</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th className="sizeColButton">Ações</th>
            </tr>
          </thead>
          <tbody>
            { alunos.length > 0
              ? alunos.map(aluno => {
                return (
                  <tr key={aluno.id}>
                    <td>
                      <span className="flex-center">
                        <Button  size="sm" onClick={() => {visualizarFoto(aluno.id)}}>
                          <Visibility></Visibility>
                        </Button>
                      </span>
                    </td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.endereco}</td>
                    <td className="flex-center">
                      <DropdownButton size="sm" as={ButtonGroup} title="Ações" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" onClick={() => {editar(aluno.id)}}>
                          <span>
                            <Create></Create>
                            <span>Editar</span>
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => {excluirAluno(aluno.id)}}>
                          <span>
                            <DeleteOutline></DeleteOutline>
                            <span>Excluir</span>
                          </span>
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                )
              }) : <tr>
                <td colSpan="4"><span className="center">Não foi cadastrado nenhum aluno</span></td>
              </tr>
            }
          </tbody>
        </Table>
      </div>

    </div>
  )
};

export default Listagem;