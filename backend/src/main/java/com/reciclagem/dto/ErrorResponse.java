package com.reciclagem.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String mensagem;
    private String detalhes;
    private LocalDateTime timestamp;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(String mensagem) {
        this();
        this.mensagem = mensagem;
    }

    public ErrorResponse(String mensagem, String detalhes) {
        this(mensagem);
        this.detalhes = detalhes;
    }

    // Getters e Setters
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getDetalhes() {
        return detalhes;
    }

    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}