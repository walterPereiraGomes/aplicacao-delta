package com.backend.delta.controllers;

import com.backend.delta.service.DocumentoService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/api/documento")
public class DocumentoController {

    private final DocumentoService documentoService;

    public DocumentoController(DocumentoService documentoService) {
        this.documentoService = documentoService;
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadDocumento(@RequestParam MultipartFile file) throws IOException {
        return ResponseEntity.ok(documentoService.createFile(file));
    }

    @GetMapping(path = "/download/{nome}")
    public ResponseEntity<InputStreamResource> exportCSVProcessos(@PathVariable String nome) throws IOException {
        return documentoService.getFile(nome);
    }
}
