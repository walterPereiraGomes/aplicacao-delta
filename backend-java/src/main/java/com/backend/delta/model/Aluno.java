package com.backend.delta.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = "public")
public class Aluno {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "aluno_id_seq")
    @SequenceGenerator(name = "processo_id_seq", sequenceName = "public.aluno_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "foto")
    private String foto;
}
