import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './index.css';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { getAluno, uploadFoto, saveAluno } from '../../../services/api';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
// import ImageUploader from 'react-images-upload';

const Aluno = () => {

  const { idAluno } = useParams();
  const [id, setId] = useState(null);
  const [foto, setFoto] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(()=>{
    if (idAluno) {
      getAluno(idAluno).then((aluno) => {
        setId(aluno.id);
        setNome(aluno.nome);
        setEndereco(aluno.endereco);
      });
    }
  },[idAluno]);

  // function onDrop(picture) {
  //   setFoto(null);
  //   setFoto(picture);
  // }

  const uploadFotoMethod = (part) => {
    const formData = new FormData();
    formData.append("foto", part);
    uploadFoto(formData, id).then((response) => {
      setFoto(response.data);
    });
  };

  // function disabledCadastro() {
  //   return nome === '' || endereco === '';
  // }

  const history = useHistory();
  async function cadastrar() {
    const AlunoPersistencia = {
      id: id,
      nome: nome,
      endereco: endereco,
      foto: "foto"
    }
    saveAluno(AlunoPersistencia).then(() => {
      history.push("/listagem");
    })
  }

  return (
    <div className="container-cadastro">
      <Card>
        <Card.Header as="h5">Cadastro de Alunos</Card.Header>
        <Card.Body>
          <div className="fieldForm">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Nome:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Digite o nome"
              value={nome}
              onChange={event => {setNome(event.target.value)}}
            />
          </InputGroup>
          </div>
          <div className="fieldForm">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Endereço:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Digite o endereço"
                value={endereco}
                onChange={event => {setEndereco(event.target.value)}}
              />
            </InputGroup>
          </div>
          <div className="fieldForm">
            <input
              id="file"
              name="foto"
              type="file"
              onChange={(e) => uploadFotoMethod(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div className="container-foto">
            <Image src={foto} fluid />
          </div>
          </Card.Body>
      </Card>
      <Button className="margin-top" variant="secondary" onClick={cadastrar}>Cadastrar</Button>
    </div>
  )
}

export default Aluno;