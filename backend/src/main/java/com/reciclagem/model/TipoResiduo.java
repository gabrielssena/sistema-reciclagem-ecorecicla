package com.reciclagem.model;

public enum TipoResiduo {
    PAPEL("Papel", 2.0),
    VIDRO("Vidro", 3.0),
    METAL("Metal", 5.0),
    PLASTICO("Plástico", 1.5);

    private final String descricao;
    private final double pontosPorKg;

    TipoResiduo(String descricao, double pontosPorKg) {
        this.descricao = descricao;
        this.pontosPorKg = pontosPorKg;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getPontosPorKg() {
        return pontosPorKg;
    }
}