// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKyKeocy98CUeE9vHP6DW44pzCJxXkimc",
    authDomain: "dna2024.firebaseapp.com",
    projectId: "dna2024",
    storageBucket: "dna2024.appspot.com",
    messagingSenderId: "217212242448",
    appId: "1:217212242448:web:6c98c554b6d571b2e21895",
    measurementId: "G-95PBYHYEB8"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém a instância do banco de dados usando o app inicializado
const db = getDatabase(app);

// Função para preencher a tabela com dados do Firebase
function preencherTabela(dados) {
    const tbody = document.getElementById("body1");
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    dados.forEach((dado, index) => {
        const tr = document.createElement("tr");
        // Adiciona classe conforme a posição
        let classePosicao = "outros"; // Classe padrão
        if (index === 0) classePosicao = "primeiro";
        else if (index === 1) classePosicao = "segundo";
        else if (index === 2) classePosicao = "terceiro";

        tr.innerHTML = `
            <td class="u-border-1 u-border-grey-30 u-table-cell ${classePosicao}">${dado.nome}</td>
            <td class="u-border-1 u-border-grey-30 u-grey-5 u-table-cell champ ${classePosicao}">${dado.votos}</td>
        `;
        tbody.appendChild(tr);
    });
}


// Função para buscar e ordenar dados do Firebase
function buscarDadosOrdenados() {
    const votosRef = ref(db, "votos");
    get(votosRef).then(snapshot => {
        const dados = [];
        snapshot.forEach(childSnapshot => {
            const dado = childSnapshot.val();
            dados.push(dado);
        });
        // Ordena em ordem decrescente de votos
        dados.sort((a, b) => b.votos - a.votos);
        preencherTabela(dados);
    }).catch(error => {
        console.error("Erro ao buscar dados:", error);
    });
}

// Manipulador de eventos para o botão "Enviar"
document.getElementById("btnEnviar").addEventListener("click", () => {
    const senha = document.getElementById("senha").value;
    if (senha === "10admdna3") { // Verifique sua senha aqui
        buscarDadosOrdenados();
    } else {
        alert("Senha incorreta!");
    }
});

// Manipulador de eventos para pressionar "Enter" no campo de senha
document.getElementById("senha").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("btnEnviar").click(); // Simula o clique no botão
    }
});
