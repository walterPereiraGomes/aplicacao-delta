package com.backend.delta.repository;

import com.backend.delta.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    List<Aluno> findByNomeIgnoreCaseContaining(String nome);


}
