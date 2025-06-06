package com.reciclagem.dto;

import com.reciclagem.model.Usuario;
import java.time.LocalDateTime;

public class UsuarioResponse {
    private String cpf;
    private String nome;
    private Integer pontos;
    private LocalDateTime dataCadastro;

    public UsuarioResponse() {}

    public UsuarioResponse(Usuario usuario) {
        this.cpf = usuario.getCpf();
        this.nome = usuario.getNome();
        this.pontos = usuario.getPontos();
        this.dataCadastro = usuario.getDataCadastro();
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
}