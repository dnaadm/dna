// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get, onValue, update,runTransaction } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

Lunaria.onclick = function () {votar("lunaria");}
Comidinhas.onclick = function () {votar("comidinhas") ;}
NutriWay.onclick = function () {votar("nutriway") ;}
CantoStelar.onclick = function () {votar("cantostelar") ;}
SweetHome.onclick = function () {votar("sweethome") ;}

// Função para votar em uma empresa
function votar(empresaId) {
    if (localStorage.getItem("votou") == "sim") {
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'VOCÊ JÁ VOTOU! NÃO PODE VOTAR MAIS DE UMA VEZ.'
        });
    } else {
        const empresaRef = ref(db, `votos/${empresaId}`);
        runTransaction(empresaRef, (empresa) => {
            if (empresa) {
                if (empresa.votos) {
                    empresa.votos++;
                } else {
                    empresa.votos = 1;
                }
            } else {
                empresa = { votos: 1 }; 
            }
            return empresa;
        }).then(() => {
            localStorage.setItem("votou", "sim");
            Swal.fire({
                icon: 'success',
                title: 'Voto Confirmado!',
                text: 'Você votou em: ' + empresaId
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível registrar seu voto. Tente novamente mais tarde. Erro: ' + error.message
            });
        });
    }
}