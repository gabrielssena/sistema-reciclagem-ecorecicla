package com.reciclagem.repository;

import com.reciclagem.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Optional<Usuario> findByCpf(String cpf);

    @Query("SELECT u FROM Usuario u ORDER BY u.pontos DESC")
    List<Usuario> findTopUsuariosByPontos();

    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.pontos >= :pontos")
    Long countUsuariosComPontosMinimos(Integer pontos);
}