package com.reciclagem.strategy;

import org.springframework.stereotype.Component;

@Component
public class PontuacaoPapelStrategy implements PontuacaoStrategy {

    @Override
    public int calcularPontos(double peso) {
        return (int) Math.round(peso * 2.0);
    }

    @Override
    public String getDescricao() {
        return "Papel: 2 pontos por kg";
    }
}