import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = axios.create({
  baseURL: 'http://walter.tplinkdns.com/api/',
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

export async function cadastraAluno(aluno) {

  configureToast();

  await api({
    url: `aluno/salvar`,
    method: 'POST',
    data: aluno,
  }).then(() => {
    toast.success('Aluno cadastrado com sucesso');
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
