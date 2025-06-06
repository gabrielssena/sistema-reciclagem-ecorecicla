package com.reciclagem.controller;

import com.reciclagem.dto.*;
import com.reciclagem.model.TipoResiduo;
import com.reciclagem.model.Transacao;
import com.reciclagem.model.Usuario;
import com.reciclagem.service.ReciclagemService;
import com.reciclagem.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reciclagem")
@Validated
public class ReciclagemController {

    @Autowired
    private ReciclagemService reciclagemService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarReciclagem(@Valid @RequestBody ReciclagemRequest request) {
        try {
            int pontosGanhos = reciclagemService.processarReciclagem(
                    request.getCpf(),
                    request.getTipoResiduo(),
                    request.getPeso()
            );

            Usuario usuario = usuarioService.buscarPorCpf(request.getCpf());

            ReciclagemResponse response = new ReciclagemResponse(
                    "Reciclagem registrada com sucesso!",
                    pontosGanhos,
                    usuario.getPontos()
            );

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Dados inválidos", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao registrar reciclagem", e.getMessage()));
        }
    }

    @GetMapping("/historico/{cpf}")
    public ResponseEntity<?> consultarHistorico(@PathVariable String cpf) {
        try {
            if (!usuarioService.validarCpf(cpf)) {
                return ResponseEntity.badRequest().body(new ErrorResponse("CPF inválido"));
            }

            List<Transacao> historico = reciclagemService.buscarHistorico(cpf);
            return ResponseEntity.ok(historico);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao consultar histórico", e.getMessage()));
        }
    }

    @PostMapping("/trocar-pontos")
    public ResponseEntity<?> trocarPontos(@Valid @RequestBody TrocaRequest request) {
        try {
            String codigoVale = reciclagemService.trocarPorValeTransporte(request.getCpf());
            Usuario usuario = usuarioService.buscarPorCpf(request.getCpf());

            TrocaResponse response = new TrocaResponse(
                    "Troca realizada com sucesso!",
                    usuario.getPontos(),
                    codigoVale
            );

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro na troca", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao processar troca", e.getMessage()));
        }
    }

    @GetMapping("/pontuacao")
    public ResponseEntity<?> obterTabelaPontuacao() {
        try {
            Map<String, Object> tabela = new HashMap<>();

            for (TipoResiduo tipo : TipoResiduo.values()) {
                Map<String, Object> info = new HashMap<>();
                info.put("descricao", tipo.getDescricao());
                info.put("pontosPorKg", tipo.getPontosPorKg());
                tabela.put(tipo.name(), info);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("materiais", tabela);
            response.put("recompensas", Map.of("valeTransporte", 50));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao obter tabela de pontuação", e.getMessage()));
        }
    }

    @GetMapping("/tipos-residuo")
    public ResponseEntity<?> obterTiposResiduo() {
        try {
            return ResponseEntity.ok(Arrays.asList(TipoResiduo.values()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao obter tipos de resíduo", e.getMessage()));
        }
    }
}