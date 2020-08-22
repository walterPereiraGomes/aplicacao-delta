package com.backend.delta.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocumentoService {
    public  String createFile(MultipartFile file) throws IOException {
        return "asdasda";

//        FileManager fileManager = FileManager.getInstance();
//        String extension = fileManager.getFileExtention(file.getOriginalFilename());
//        return fileManager.createFile(file.getBytes(), extension);
    }
}
