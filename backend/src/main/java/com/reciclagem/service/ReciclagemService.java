package com.reciclagem.service;

import com.reciclagem.model.*;
import com.reciclagem.repository.TransacaoRepository;
import com.reciclagem.strategy.PontuacaoStrategy;
import com.reciclagem.strategy.PontuacaoStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ReciclagemService {

    private static final int PONTOS_VALE_TRANSPORTE = 50;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private PontuacaoStrategyFactory pontuacaoStrategyFactory;

    public int processarReciclagem(String cpf, TipoResiduo tipoResiduo, Double peso) {
        Usuario usuario = usuarioService.buscarPorCpf(cpf);

        PontuacaoStrategy strategy = pontuacaoStrategyFactory.getStrategy(tipoResiduo);
        int pontosGanhos = strategy.calcularPontos(peso);

        usuario.adicionarPontos(pontosGanhos);
        usuarioService.salvar(usuario);

        Transacao transacao = new Transacao(cpf, tipoResiduo, peso, pontosGanhos, TipoOperacao.RECICLAGEM);
        transacao.setObservacao("Reciclagem de " + tipoResiduo.getDescricao());
        transacaoRepository.save(transacao);

        return pontosGanhos;
    }

    public String trocarPorValeTransporte(String cpf) {
        Usuario usuario = usuarioService.buscarPorCpf(cpf);

        if (usuario.getPontos() < PONTOS_VALE_TRANSPORTE) {
            throw new IllegalArgumentException("Pontos insuficientes. Necessário: " + PONTOS_VALE_TRANSPORTE + " pontos");
        }

        usuario.removerPontos(PONTOS_VALE_TRANSPORTE);
        usuarioService.salvar(usuario);

        String codigoVale = gerarCodigoVale();

        Transacao transacao = new Transacao(cpf, null, null, -PONTOS_VALE_TRANSPORTE, TipoOperacao.TROCA);
        transacao.setObservacao("Troca por vale-transporte - Código: " + codigoVale);
        transacaoRepository.save(transacao);

        return codigoVale;
    }

    public List<Transacao> buscarHistorico(String cpf) {
        return transacaoRepository.findByUsuarioCpfOrderByDataTransacaoDesc(cpf);
    }

    public List<Transacao> buscarHistoricoReciclagem(String cpf) {
        return transacaoRepository.findByCpfUsuarioAndTipoOperacao(cpf, TipoOperacao.RECICLAGEM);
    }

    public List<Transacao> buscarHistoricoTrocas(String cpf) {
        return transacaoRepository.findByCpfUsuarioAndTipoOperacao(cpf, TipoOperacao.TROCA);
    }

    private String gerarCodigoVale() {
        return "VT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}