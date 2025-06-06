package com.reciclagem.strategy;

import org.springframework.stereotype.Component;

@Component
public class PontuacaoMetalStrategy implements PontuacaoStrategy {

    @Override
    public int calcularPontos(double peso) {
        return (int) Math.round(peso * 5.0);
    }

    @Override
    public String getDescricao() {
        return "Metal: 5 pontos por kg";
    }
}