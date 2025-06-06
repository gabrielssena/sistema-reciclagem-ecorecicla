package com.reciclagem.controller;

import com.reciclagem.dto.*;
import com.reciclagem.model.Usuario;
import com.reciclagem.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
@Validated
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Usuario usuario = usuarioService.buscarOuCriarUsuario(request.getCpf(), request.getNome());
            return ResponseEntity.ok(new UsuarioResponse(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao processar login", e.getMessage()));
        }
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> buscarUsuario(@PathVariable String cpf) {
        try {
            if (!usuarioService.validarCpf(cpf)) {
                return ResponseEntity.badRequest().body(new ErrorResponse("CPF inválido"));
            }

            Usuario usuario = usuarioService.buscarPorCpf(cpf);
            return ResponseEntity.ok(new UsuarioResponse(usuario));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao buscar usuário", e.getMessage()));
        }
    }

    @GetMapping("/{cpf}/pontos")
    public ResponseEntity<?> consultarPontos(@PathVariable String cpf) {
        try {
            Usuario usuario = usuarioService.buscarPorCpf(cpf);
            return ResponseEntity.ok(new PontosResponse(usuario.getPontos()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao consultar pontos", e.getMessage()));
        }
    }

    @GetMapping("/ranking")
    public ResponseEntity<?> obterRanking() {
        try {
            List<Usuario> topUsuarios = usuarioService.listarTopUsuarios();
            List<UsuarioResponse> ranking = topUsuarios.stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ranking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao obter ranking", e.getMessage()));
        }
    }
}