package com.reciclagem.strategy;

import org.springframework.stereotype.Component;

@Component
public class PontuacaoPlasticoStrategy implements PontuacaoStrategy {

    @Override
    public int calcularPontos(double peso) {
        return (int) Math.round(peso * 1.5);
    }

    @Override
    public String getDescricao() {
        return "Plástico: 1.5 pontos por kg";
    }
}