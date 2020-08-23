import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, DropdownButton, Button, Dropdown, ButtonGroup, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getAlunos, deleteAluno } from '../../../services/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Create, DeleteOutline, Visibility } from '@material-ui/icons';

function Listagem() {

  const history = useHistory();
  const [campoPesquisa, setCampoPesquisa] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [show, setShow] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    findAlunos();
  }, []);

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
    getAlunos(campoPesquisa).then((alunos) => {
      setAlunos(alunos)
    })
  }

  function visualizarFoto(foto){
    setFotoUsuario(foto);
    handleShow();
  }

  function editar(idAluno) {
    history.push(`/editar/${idAluno}`);
  }
  
  return (
    <div className="container-listagem">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><span>Visualização do aluno</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="center">
          <img className="width-foto" src={`http://localhost:8080/api/documento/download/${fotoUsuario}`} alt="fotoAluno"></img>
        </Modal.Body>
      </Modal>
      <div className="header">
        <Button className="margin-bottom" type="button" onClick={goToCadastro}>
          Cadastrar novo Aluno
        </Button>
        <div className="search">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Pesquise pelo nome"
              aria-describedby="basic-addon2"
              value={campoPesquisa}
              onChange={event => {setCampoPesquisa(event.target.value)}}
              />
            <InputGroup.Append>
              <Button onClick={findAlunos}>Pesquisar</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
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
                        <Button type="button" size="sm" variant="outline-secondary" onClick={() => {visualizarFoto(aluno.foto)}}>
                          <Visibility></Visibility>
                        </Button>
                      </span>
                    </td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.endereco}</td>
                    <td className="flex-center">
                      <DropdownButton size="sm" as={ButtonGroup} title="Ações" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" onClick={() => {editar(aluno.id)}}>
                          <span className="item-dropdown">
                            <Create></Create>
                            <span className="opcao-dropdown">Editar</span>
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => {excluirAluno(aluno.id)}}>
                          <span className="item-dropdown">
                            <DeleteOutline></DeleteOutline>
                            <span className="opcao-dropdown">Excluir</span>
                          </span>
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                )
              }) : <tr>
                <td colSpan="4"><span className="center">Nenhum aluno encontrado</span></td>
              </tr>
            }
          </tbody>
        </Table>
      </div>

    </div>
  )
};

export default Listagem;