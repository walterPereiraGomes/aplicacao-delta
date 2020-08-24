import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './index.css';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { getAluno, uploadFoto, saveAluno } from '../../../services/api';
import { useHistory } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Aluno = () => {

  toast.configure({
    autoClose: 5000,
    draggable: false,
  });

  const { idAluno } = useParams();
  const [aluno, setAluno] = useState({id: null, nome: '', endereco: '', foto: ''});

  useEffect(()=>{
    if (idAluno) {
      getAluno(idAluno).then((aluno) => {
        setAluno(aluno);
      });
    }
  },[idAluno]);

  const uploadFotoMethod = (part, jogaFora) => {
    const formData = new FormData();
    formData.append("file", part[0]);
    uploadFoto(formData).then((response) => {
      setAluno({...aluno, foto: response.data})
    });
  };

  const history = useHistory();
  async function cadastrar() {
    if (!!aluno.nome && !!aluno.endereco && !!aluno.foto) {
      saveAluno(aluno).then(() => {
        history.push("/listagem");
      })
    } else {
      toast.warning("Preencha todos os campos.");
    }
  }

  return (
    <div className="container-cadastro">
      <Card>
        <Card.Header as="h5">Cadastro de Alunos</Card.Header>
        <Card.Body>
          <div className="fieldForm">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                Nome:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Digite o nome"
              value={aluno.nome}
              onChange={event => {setAluno({...aluno, nome: event.target.value})}}
            />
          </InputGroup>
          </div>
          <div className="fieldForm">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  Endereço:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Digite o endereço"
                value={aluno.endereco}
                onChange={event => {setAluno({ ...aluno, endereco: event.target.value })}}
              />
            </InputGroup>
          </div>
          <div className="fieldForm">
            <ImageUploader
              withIcon={true}
              buttonText='Selecione a imagem'
              onChange={uploadFotoMethod}
              imgExtension={['.jpg']}
              maxFileSize={5242880}
              label='tipos aceitaveis: JPG | Tamanho maximo: 5mb'
              singleImage={true}
            />
          </div>
          {
            aluno.foto ?
              (<img className="width-foto" src={`http://localhost:8080/api/documento/download/${aluno.foto}`} alt="fotoAluno"></img>) : null
          }
          </Card.Body>
      </Card>
      <Button className="margin-top" variant="secondary" onClick={cadastrar}>
        Finalizar
      </Button>
    </div>
  )
}

export default Aluno;