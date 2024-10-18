let listaUsuarios = [];
let listaJogos =[]
let alunoEditIndex = null; // Armazena o índice do aluno em edição

function cadastrarUsuario() {
    let nome = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
}

function cadastrarJogos() {
    let nomeJog = document.getElementById("nomeJog").value;
    let tipoJogo = document.getElementById("tipoJogo").value;
}

const ids = ["21", "20", "139", "199", "249", "502", "523", "527", "1090"];
const favoritos = [];

for (const id of ids) {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
        .then(response => response.json())
        .then(data => {
            const anime = data.data;

            if (anime) {
                const isFavorito = favoritos.includes(anime.title) ? 'fa-heart-circle-minus' : 'fa-heart-circle-plus';
                const linha = `
                    <tr>
                        <td><img src="${anime.images.jpg.image_url}" alt="${anime.title} Avatar" /></td>
                        <td><b>${anime.title}</b></td>
                        <td>${anime.type}</td>
                        <td>${anime.synopsis}</td>
                        <td>
                            <button class="btn btn-outline-danger" onclick="toggleFavorites('${anime.title}', this)">
                                <i class="fa-solid fa-2x ${isFavorito}"></i>
                            </button>
                        </td>
                    </tr>
                `;
                document.querySelector('tbody').insertAdjacentHTML('beforeend', linha);
            } else {
                console.error("Anime não encontrado");
            }
        })
        .catch(err => console.error('error:' + err));
}

// Função para adicionar/remover dos favoritos
function toggleFavorites(title, button) {
    const index = favoritos.indexOf(title);
    if (index === -1) {
        favoritos.push(title);
        button.querySelector('i').classList.remove('fa-heart-circle-plus');
        button.querySelector('i').classList.add('fa-heart-circle-minus');
        alert(`${title} adicionado aos favoritos!`);
    } else {
        favoritos.splice(index, 1);
        button.querySelector('i').classList.remove('fa-heart-circle-minus');
        button.querySelector('i').classList.add('fa-heart-circle-plus');
        alert(`${title} removido dos favoritos!`);
    }
    console.log('Favoritos:', favoritos);
}
