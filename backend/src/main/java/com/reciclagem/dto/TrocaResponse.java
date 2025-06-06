package com.reciclagem.dto;

public class TrocaResponse {
    private String mensagem;
    private Integer pontosRestantes;
    private String codigoVale;

    public TrocaResponse() {}

    public TrocaResponse(String mensagem, Integer pontosRestantes, String codigoVale) {
        this.mensagem = mensagem;
        this.pontosRestantes = pontosRestantes;
        this.codigoVale = codigoVale;
    }

    // Getters e Setters
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Integer getPontosRestantes() {
        return pontosRestantes;
    }

    public void setPontosRestantes(Integer pontosRestantes) {
        this.pontosRestantes = pontosRestantes;
    }

    public String getCodigoVale() {
        return codigoVale;
    }

    public void setCodigoVale(String codigoVale) {
        this.codigoVale = codigoVale;
    }
}