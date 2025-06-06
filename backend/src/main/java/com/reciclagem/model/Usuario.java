package com.reciclagem.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 dígitos")
    private String cpf;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer pontos = 0;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    public Usuario() {
        this.dataCadastro = LocalDateTime.now();
    }

    public Usuario(String cpf, String nome) {
        this();
        this.cpf = cpf;
        this.nome = nome;
    }

    // Getters e Setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    // Métodos de negócio
    public void adicionarPontos(int pontos) {
        this.pontos += pontos;
    }

    public boolean removerPontos(int pontos) {
        if (this.pontos >= pontos) {
            this.pontos -= pontos;
            return true;
        }
        return false;
    }
}