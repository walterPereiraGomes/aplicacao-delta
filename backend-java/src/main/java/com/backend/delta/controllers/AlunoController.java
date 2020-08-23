package com.backend.delta.controllers;

import com.backend.delta.model.Aluno;
import com.backend.delta.service.AlunoService;
import com.backend.delta.utils.FiltroAluno;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/aluno")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping(path = "find", produces = "application/json")
    public List<Aluno> alunos(@RequestBody FiltroAluno filtroAluno) {
        return alunoService.findAlunos(filtroAluno.nome);
    }

    @GetMapping(path = "/{id}")
    public Aluno getAluno(@PathVariable Integer id) {
        return alunoService.getById(id);
    }

    @DeleteMapping("deletar/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        alunoService.deleteById(id);
        return ResponseEntity.ok("ok");
    }

    @PostMapping(path = "/salvar")
    public ResponseEntity<String> save(@RequestBody Aluno aluno) {
        if (aluno == null) {
            return ResponseEntity.unprocessableEntity().body("aluno nulo");
        }
        alunoService.saveAluno(aluno);
        return ResponseEntity.ok("ok");
    }

}
