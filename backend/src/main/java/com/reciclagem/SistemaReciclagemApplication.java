package com.reciclagem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SistemaReciclagemApplication {

    public static void main(String[] args) {
        System.out.println("=== SISTEMA DE INCENTIVO À RECICLAGEM ===");
        System.out.println("Contribuindo para o ODS 11 - Cidades Sustentáveis");
        System.out.println("Backend iniciando na porta 8080...\n");

        SpringApplication.run(SistemaReciclagemApplication.class, args);
    }
}