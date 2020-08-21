<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Aluno extends CI_Controller {

  public function __construct(){

          parent::__construct();

      $this->load->library('session');
      $this->load->helper('url');
      $this->load->database();
      $this->load->model('AlunoModel');
      
  }

  public function all(){

    return $this->output
              ->set_content_type('application/json')
              ->set_status_header(200)
              ->set_output(json_encode($this->AlunoModel->getAlunos()));
  }

  public function salvar(){

    $aluno = $this->AlunoModel->insert_entry();

    if($aluno) {
      return $this->output
        ->set_content_type('application/json')
        ->set_status_header(200)
        ->set_output(json_encode($aluno));
    } else {
      return $this->output
                ->set_content_type('application/json')
                ->set_status_header(403)
                ->set_output(json_encode(array(
					'erro' => 'erro ao salvar',
				)));
    }
    
  }


  public function atualizar($id) { 

    $aluno = $this->AlunoModel->update_entry($id);

    if($aluno) {
      return $this->output
        ->set_content_type('application/json')
        ->set_status_header(200)
        ->set_output(json_encode($aluno));
    } else {
      return $this->output
                ->set_content_type('application/json')
                ->set_status_header(403)
                ->set_output(json_encode(array(
          'erro' => 'erro ao atualizar',
        )));
    }

  }

  public function deletar($id){

    $aluno = $this->AlunoModel->delete_entry($id);

    if($aluno) {
      return $this->output
        ->set_content_type('application/json')
        ->set_status_header(200)
        ->set_output(json_encode($aluno));
    } else {
      return $this->output
                ->set_content_type('application/json')
                ->set_status_header(403)
                ->set_output(json_encode(array(
          'erro' => 'erro ao deletar',
        )));
    }
  }



}
