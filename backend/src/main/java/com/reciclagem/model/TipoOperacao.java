package com.reciclagem.model;

public enum TipoOperacao {
    RECICLAGEM("Reciclagem"),
    TROCA("Troca de Pontos");

    private final String descricao;

    TipoOperacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}