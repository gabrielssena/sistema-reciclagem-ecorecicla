package com.reciclagem.dto;

public class PontosResponse {
    private Integer pontos;

    public PontosResponse() {}

    public PontosResponse(Integer pontos) {
        this.pontos = pontos;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }
}