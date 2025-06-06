package com.reciclagem.dto;

public class ReciclagemResponse {
    private String mensagem;
    private Integer pontosGanhos;
    private Integer totalPontos;

    public ReciclagemResponse() {}

    public ReciclagemResponse(String mensagem, Integer pontosGanhos, Integer totalPontos) {
        this.mensagem = mensagem;
        this.pontosGanhos = pontosGanhos;
        this.totalPontos = totalPontos;
    }

    // Getters e Setters
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Integer getPontosGanhos() {
        return pontosGanhos;
    }

    public void setPontosGanhos(Integer pontosGanhos) {
        this.pontosGanhos = pontosGanhos;
    }

    public Integer getTotalPontos() {
        return totalPontos;
    }

    public void setTotalPontos(Integer totalPontos) {
        this.totalPontos = totalPontos;
    }
}