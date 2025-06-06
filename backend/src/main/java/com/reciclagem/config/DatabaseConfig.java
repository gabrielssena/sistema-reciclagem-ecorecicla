package com.reciclagem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.reciclagem.repository")
@EnableTransactionManagement
public class DatabaseConfig {
    // Configuração básica para H2 Database
}