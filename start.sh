#!/bin/bash

echo "=== SISTEMA DE INCENTIVO À RECICLAGEM ==="
echo "Iniciando Backend e Frontend..."
echo ""

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Porta $1 já está em uso!"
        return 1
    else
        return 0
    fi
}

# Verificar portas
if ! check_port 8080; then
    echo "Backend já está rodando na porta 8080"
else
    echo "Iniciando Backend (Spring Boot)..."
    cd backend
    mvn spring-boot:run &
    BACKEND_PID=$!
    cd ..
    echo "Backend iniciado com PID: $BACKEND_PID"
fi

# Aguardar um pouco para o backend inicializar
sleep 5

if ! check_port 3000; then
    echo "Frontend já está rodando na porta 3000"
else
    echo "Iniciando Frontend (React)..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    echo "Frontend iniciado com PID: $FRONTEND_PID"
fi

echo ""
echo "🚀 Sistema iniciado com sucesso!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080/api"
echo ""
echo "Pressione Ctrl+C para parar os serviços"

# Aguardar sinal de interrupção
wait