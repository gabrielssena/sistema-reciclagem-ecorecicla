package com.reciclagem.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class TrocaRequest {

    @NotBlank(message = "CPF é obrigatório")
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 dígitos")
    private String cpf;

    public TrocaRequest() {}

    public TrocaRequest(String cpf) {
        this.cpf = cpf;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}