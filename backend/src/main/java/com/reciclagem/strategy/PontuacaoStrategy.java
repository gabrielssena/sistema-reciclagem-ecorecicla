package com.reciclagem.strategy;

public interface PontuacaoStrategy {
    int calcularPontos(double peso);
    String getDescricao();
}