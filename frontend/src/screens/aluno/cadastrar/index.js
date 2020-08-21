import React, { useState } from 'react';
import './index.css';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import ImageUploader from 'react-images-upload';

const Aluno = () => {
  const [foto, setFoto] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  function onDrop(picture) {
    setFoto(null);
    setFoto(picture);
  }

  const history = useHistory();
  function cadastrar() {
    history.push("/listagem");
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
            <ImageUploader
              withIcon={true}
              withPreview={true}
              buttonText='Selecione a imagem'
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
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