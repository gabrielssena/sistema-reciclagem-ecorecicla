package com.reciclagem.dto;

import com.reciclagem.model.TipoResiduo;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ReciclagemRequest {

    @NotBlank(message = "CPF é obrigatório")
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 dígitos")
    private String cpf;

    @NotNull(message = "Tipo de resíduo é obrigatório")
    private TipoResiduo tipoResiduo;

    @NotNull(message = "Peso é obrigatório")
    @DecimalMin(value = "0.1", message = "Peso deve ser maior que 0.1 kg")
    private Double peso;

    public ReciclagemRequest() {}

    public ReciclagemRequest(String cpf, TipoResiduo tipoResiduo, Double peso) {
        this.cpf = cpf;
        this.tipoResiduo = tipoResiduo;
        this.peso = peso;
    }

    // Getters e Setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
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
}