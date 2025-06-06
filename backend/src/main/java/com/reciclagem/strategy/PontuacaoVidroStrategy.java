package com.reciclagem.strategy;

import org.springframework.stereotype.Component;

@Component
public class PontuacaoVidroStrategy implements PontuacaoStrategy {

    @Override
    public int calcularPontos(double peso) {
        return (int) Math.round(peso * 3.0);
    }

    @Override
    public String getDescricao() {
        return "Vidro: 3 pontos por kg";
    }
}