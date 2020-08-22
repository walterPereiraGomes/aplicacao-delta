import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

function configureToast() {
  toast.configure({
    autoClose: 5000,
    draggable: false,
  });
}

export async function getAlunos() {

  configureToast();

  const result = await api({
    url: 'aluno/all',
    method: 'GET',
  }).catch((e) => {
    toast.error(e.message);
  });

  return result.data;
}

export async function getAluno(id) {

  configureToast();

  const result = await api({
    url: `aluno/${id}`,
    method: 'GET',
  }).catch((e) => {
    toast.error(e.message);
  });

  return result.data;
}

export const uploadFoto = (foto, idAluno) => {
  return axios.post(`/foto/upload/${idAluno}`, foto, {
    headers: { Authorization: "Bearer "},
  });
};

export async function deleteAluno(id) {

  configureToast();

  await api({
    url: `aluno/deletar/${id}`,
    method: 'DELETE',
  }).then(() => {
    toast.success('Aluno excluido com sucesso');
  }).catch((e) => {
    toast.error(e.message);
  });
}

export async function saveAluno(aluno) {

  configureToast();

  await api({
    url: `aluno/salvar`,
    method: 'POST',
    data: aluno,
  }).then(() => {
    toast.success('Aluno salvo com sucesso');
  }).catch((e) => {
    toast.error(e.message);
  });
}

export async function atualizaAluno(aluno) {

  configureToast();

  await api({
    url: `aluno/atualizar`,
    method: 'POST',
    data: aluno,
  }).then(() => {
    toast.success('Aluno editado com sucesso');
  }).catch((e) => {
    toast.error(e.message);
  });
}
