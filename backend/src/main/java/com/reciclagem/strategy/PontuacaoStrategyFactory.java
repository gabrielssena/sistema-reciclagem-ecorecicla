package com.reciclagem.strategy;

import com.reciclagem.model.TipoResiduo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PontuacaoStrategyFactory {

    @Autowired
    private PontuacaoPapelStrategy pontuacaoPapelStrategy;

    @Autowired
    private PontuacaoVidroStrategy pontuacaoVidroStrategy;

    @Autowired
    private PontuacaoMetalStrategy pontuacaoMetalStrategy;

    @Autowired
    private PontuacaoPlasticoStrategy pontuacaoPlasticoStrategy;

    public PontuacaoStrategy getStrategy(TipoResiduo tipoResiduo) {
        switch (tipoResiduo) {
            case PAPEL:
                return pontuacaoPapelStrategy;
            case VIDRO:
                return pontuacaoVidroStrategy;
            case METAL:
                return pontuacaoMetalStrategy;
            case PLASTICO:
                return pontuacaoPlasticoStrategy;
            default:
                throw new IllegalArgumentException("Tipo de resíduo não suportado: " + tipoResiduo);
        }
    }
}