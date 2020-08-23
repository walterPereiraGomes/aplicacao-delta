package com.backend.delta.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@Service
public class DocumentoService {

    private final String PASTA_ARQUIVOS = "/home/documentos/"; // definindo path onde serão armazenados as imagens

    public  String createFile(MultipartFile file) throws IOException {

        String nome = UUID.randomUUID().toString() + ".jpg";

        File destino = new File(PASTA_ARQUIVOS + nome );

        FileCopyUtils.copy(file.getBytes(),destino);

        return nome;

    }

    public ResponseEntity<InputStreamResource> getFile(String nome) throws FileNotFoundException {
        File foto = new File(PASTA_ARQUIVOS + nome); // definindo arquivo no diretório

        InputStreamResource fotoByte = new InputStreamResource(new FileInputStream(foto));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + nome)
                .contentType(MediaType.IMAGE_JPEG)
                .contentLength(foto.length())
                .body(fotoByte);

    }

}