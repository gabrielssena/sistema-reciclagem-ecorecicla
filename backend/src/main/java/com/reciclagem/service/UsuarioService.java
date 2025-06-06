package com.reciclagem.service;

import com.reciclagem.model.Usuario;
import com.reciclagem.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscarOuCriarUsuario(String cpf, String nome) {
        // Validar CPF
        if (!validarCpf(cpf)) {
            throw new IllegalArgumentException("CPF inválido. Deve conter exatamente 11 dígitos numéricos.");
        }

        Optional<Usuario> usuarioExistente = usuarioRepository.findByCpf(cpf);

        if (usuarioExistente.isPresent()) {
            return usuarioExistente.get();
        }

        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome é obrigatório para novos usuários");
        }

        Usuario novoUsuario = new Usuario(cpf, nome.trim());
        return usuarioRepository.save(novoUsuario);
    }

    public Usuario buscarPorCpf(String cpf) {
        if (!validarCpf(cpf)) {
            throw new IllegalArgumentException("CPF inválido");
        }

        return usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTopUsuarios() {
        return usuarioRepository.findTopUsuariosByPontos();
    }

    public Long contarUsuariosComPontosMinimos(Integer pontos) {
        return usuarioRepository.countUsuariosComPontosMinimos(pontos);
    }

    public boolean validarCpf(String cpf) {
        if (cpf == null) {
            return false;
        }

        // Remove qualquer caractere que não seja dígito
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");

        // Verifica se tem exatamente 11 dígitos e se são todos números
        if (cpfLimpo.length() != 11) {
            return false;
        }

        // Verifica se todos os caracteres são dígitos
        try {
            Long.parseLong(cpfLimpo);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}