package com.reciclagem.repository;

import com.reciclagem.model.TipoOperacao;
import com.reciclagem.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    @Query("SELECT t FROM Transacao t WHERE t.cpfUsuario = :cpf ORDER BY t.dataTransacao DESC")
    List<Transacao> findByUsuarioCpfOrderByDataTransacaoDesc(@Param("cpf") String cpf);

    @Query("SELECT t FROM Transacao t WHERE t.cpfUsuario = :cpf AND t.tipoOperacao = :tipoOperacao ORDER BY t.dataTransacao DESC")
    List<Transacao> findByCpfUsuarioAndTipoOperacao(@Param("cpf") String cpf, @Param("tipoOperacao") TipoOperacao tipoOperacao);

    @Query("SELECT SUM(t.pontosGanhos) FROM Transacao t WHERE t.cpfUsuario = :cpf AND t.tipoOperacao = :tipoOperacao")
    Integer sumPontosByCpfUsuarioAndTipoOperacao(@Param("cpf") String cpf, @Param("tipoOperacao") TipoOperacao tipoOperacao);

    @Query("SELECT COUNT(t) FROM Transacao t WHERE t.dataTransacao >= :dataInicio")
    Long countTransacoesPorPeriodo(@Param("dataInicio") LocalDateTime dataInicio);
}