<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Controller {

  public function __construct(){

          parent::__construct();

      $this->load->library('upload');
      $this->load->helper('url');
      
  }

  public function index() {

    $nome_arquivo =uniqid().'.jpg';

    $configuracao = array(
          'upload_path'   => './imagens/',
          'allowed_types' => 'jpg',
          'file_name'     => $nome_arquivo,
          'max_size'      => '2000'
      );
    $this->upload->initialize($configuracao);
     if ($this->upload->do_upload('foto')) {
        return $this->output
                    ->set_content_type('application/json')
                    ->set_status_header(200)
                    ->set_output(json_encode(base_url().'imagens/'.$nome_arquivo));
      } else {
        return $this->output
                  ->set_content_type('application/json')
                  ->set_status_header(403)
                  ->set_output(json_encode(array(
            'erro' => 'erro no upload',
          )));
      }
  }

}
