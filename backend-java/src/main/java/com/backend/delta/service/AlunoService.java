package com.backend.delta.service;

import com.backend.delta.model.Aluno;
import com.backend.delta.repository.AlunoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    public Aluno getById(Integer id) {
        return alunoRepository.findById(id).get();
    }

    public void deleteById(Integer id) {
        alunoRepository.deleteById(id);
    }

    public void saveAluno(Aluno aluno) {
        if (aluno.getId() != null) {
            Aluno alunoSalvo = alunoRepository.findById(aluno.getId()).get();
            alunoSalvo.setEndereco(aluno.getEndereco());
            alunoSalvo.setFoto(aluno.getFoto());
            alunoSalvo.setNome(aluno.getNome());
            alunoRepository.save(alunoSalvo);
        } else {
            alunoRepository.save(aluno);
        }
    }
}
