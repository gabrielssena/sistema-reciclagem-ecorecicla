package com.reciclagem.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpf_usuario", nullable = false)
    private String cpfUsuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_residuo")
    private TipoResiduo tipoResiduo;

    private Double peso;

    @Column(name = "pontos_ganhos", nullable = false)
    private Integer pontosGanhos;

    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime dataTransacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_operacao", nullable = false)
    private TipoOperacao tipoOperacao;

    private String observacao;

    public Transacao() {
        this.dataTransacao = LocalDateTime.now();
    }

    public Transacao(String cpfUsuario, TipoResiduo tipoResiduo, Double peso, Integer pontosGanhos, TipoOperacao tipoOperacao) {
        this();
        this.cpfUsuario = cpfUsuario;
        this.tipoResiduo = tipoResiduo;
        this.peso = peso;
        this.pontosGanhos = pontosGanhos;
        this.tipoOperacao = tipoOperacao;
    }

    // Getters e Setters completos
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpfUsuario() {
        return cpfUsuario;
    }

    public void setCpfUsuario(String cpfUsuario) {
        this.cpfUsuario = cpfUsuario;
    }

    public TipoResiduo getTipoResiduo() {
        return tipoResiduo;
    }

    public void setTipoResiduo(TipoResiduo tipoResiduo) {
        this.tipoResiduo = tipoResiduo;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Integer getPontosGanhos() {
        return pontosGanhos;
    }

    public void setPontosGanhos(Integer pontosGanhos) {
        this.pontosGanhos = pontosGanhos;
    }

    public LocalDateTime getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDateTime dataTransacao) {
        this.dataTransacao = dataTransacao;
    }

    public TipoOperacao getTipoOperacao() {
        return tipoOperacao;
    }

    public void setTipoOperacao(TipoOperacao tipoOperacao) {
        this.tipoOperacao = tipoOperacao;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}