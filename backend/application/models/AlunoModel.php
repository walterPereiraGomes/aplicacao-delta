<?php

class AlunoModel extends CI_Model {

  public $id;
  public $nome;
  public $endereco;
  public $foto;

  public function getAlunos() {
      return $this->db->get('alunos')->result();
  }

  public function insert_entry() {
    return  $this->db->insert('alunos', json_decode($this->input->raw_input_stream));
  }

  public function update_entry($id) {
    
      $aluno = json_decode($this->input->raw_input_stream);

      return  $this->db->update('alunos', $aluno, array('id' =>$id));
  }

  public function delete_entry($id){

      $this->db->where('id', $id);   
      return $this->db->delete('alunos'); 
  }

}
