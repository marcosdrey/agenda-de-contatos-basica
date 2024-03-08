const btnAdicionarContato = document.querySelectorAll('.adicionar-contato');
const btnMostrarContato = document.querySelector('.mostrar-contato');
const btnMostrarFav = document.querySelector('.mostrar-fav');
const nomeNovoContato = document.querySelector('#nome');
const telefoneNovoContato = document.querySelector('#tel');
const formDiv = document.querySelector('.form_div')
const form = document.querySelector('#form');
let contatos = JSON.parse(localStorage.getItem("agenda")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let nomeEditado = "";
let telEditado = "";

if(contatos) {
    contatos.forEach(contato => {
        adcContatoNaPage(contato.nome, contato.telefone)
        const botao = document.querySelectorAll('.botao-inativo');
        if(contato.fav) {
            botao.forEach(b => {
                b.classList.remove('botao-inativo');
                b.classList.add('botao-ativo');
            })
            
        } else {
            botao.forEach(b => {
                b.classList.remove('botao-ativo');
                b.classList.add('botao-inativo');
            }) 
        }
    })
}

btnMostrarContato.addEventListener('click', ()=> {
    const displayInfos = document.querySelector('.display_infos')
    displayInfos.classList.toggle('hidden')
    if(displayInfos.classList.contains('hidden')) {
        btnMostrarContato.textContent = '1 - Mostrar Contatos'
    } else {
        btnMostrarContato.textContent = '1 - Fechar Contatos'
    }

    const cardContato = displayInfos.querySelectorAll('.card-contato');
    cardContato.forEach(contato => {
        if(contato.classList.contains = "hidden") {
            contato.classList.remove('hidden')
        }
    })
})

btnAdicionarContato.forEach(botao => {
    botao.addEventListener('click', ()=>{
        formDiv.classList.remove('hidden')
    })
})

btnMostrarFav.addEventListener('click', () => {
    const displayInfos = document.querySelector('.display_infos')
    displayInfos.classList.toggle('hidden')
    if(displayInfos.classList.contains('hidden')) {
        btnMostrarFav.textContent = '3 - Mostrar Favoritos'
    } else {
        btnMostrarFav.textContent = '3 - Fechar Favoritos'
    }

    const cardContato = displayInfos.querySelectorAll('.card-contato')
    cardContato.forEach(contato => {
        const cardButtons = contato.querySelector('.card-contato-buttons');
        const cardFavBtn = cardButtons.querySelector('.card-contato_fav');

        if(cardFavBtn.classList.contains('botao-inativo')) {
            contato.classList.add('hidden');
        }
    })
})

form.addEventListener('submit', (event)=> {
    event.preventDefault()
    if(telefoneNovoContato.value && nomeNovoContato.value) {
        adcContatoNaPage(nomeNovoContato.value, telefoneNovoContato.value)
        adcContatoNoSistema(nomeNovoContato.value, telefoneNovoContato.value)
    }
    nomeNovoContato.value = ""
    nomeNovoContato.focus()
    telefoneNovoContato.value = ""
})

function adcContatoNaPage(nome, telefone) {
    const displayInfos = document.querySelector('.display_infos');
    const cardContato = document.createElement('div')
    cardContato.className = 'card-contato';
    const imgContato = document.createElement('img');
    imgContato.className = 'card-contato_foto'
    imgContato.setAttribute('src', 'images/padrao.jpg');
    imgContato.setAttribute('alt', 'Foto do Contato');
    const h4 = document.createElement('h4')
    h4.className = 'card-contato_nome'
    h4.textContent = nome;
    const h5 = document.createElement('h5')
    h5.className = 'card-contato_tel'
    h5.textContent = telefone;

    const cardContatoBtnDiv = document.createElement('div')
    cardContatoBtnDiv.className = 'card-contato-buttons';

    const edit = document.createElement('button')
    edit.className = "card-contato_edit";
    edit.innerHTML = "<i class='fa-solid fa-pen'></i>";
    edit.addEventListener('click', function(){
        editarContato(nome, telefone);
        if(nomeEditado) {
            nome = nomeEditado
        }
        if(telEditado) {
            telefone = telEditado
        }
        
    })

    const trash = document.createElement('button');
    trash.className = "card-contato_trash";
    trash.innerHTML = "<i class='fa-solid fa-trash'></i>"
    trash.addEventListener('click', function(){
        removerContato(nome, telefone)
    })

    const botao = document.createElement('button')
    botao.className = 'card-contato_fav botao-inativo'
    botao.innerHTML = "<i class='fa-solid fa-heart'></i>";
    botao.addEventListener('click', function(){
        favoritarContato(nome, telefone, botao);
    })

    cardContatoBtnDiv.append(edit, botao, trash)

    cardContato.append(imgContato, h4, h5, cardContatoBtnDiv);

    displayInfos.append(cardContato); 
}

function adcContatoNoSistema(nome, telefone) {
    const nomeContato = nome;
    const telefoneContato = telefone;
    const contato = {
        nome: nomeContato,
        telefone: telefoneContato,
        fav: false
    }
    contatos.push(contato);
    localStorage.setItem("agenda", JSON.stringify(contatos));
}

function fecharDiv(div) {
    const divFechada = document.querySelector(div)
    divFechada.classList.add('hidden');
}

function favoritarContato(nome, telefone, botao) {
    contatos.forEach(contato => {
        if(contato.nome === nome && contato.telefone === telefone) {
            if (contato.fav === false) {
                contato.fav = true;
                botao.classList.remove('botao-inativo');
                botao.classList.add('botao-ativo');
            } else {
                contato.fav = false;
                botao.classList.remove('botao-ativo');
                botao.classList.add('botao-inativo');
            }
            localStorage.setItem("agenda", JSON.stringify(contatos))
            if(contato.fav) {
                favoritos.push(contato);
            } else {
                favoritos = favoritos.filter(item => item !== contato)
            }
            localStorage.setItem("favoritos", JSON.stringify(favoritos))
        }
        
    })

}

function editarContato(nome, telefone) {
    const decisao = prompt('Digite um número:\n[1] Editar Nome\n[2] Editar Número de Telefone.\n[3] Sair.')
    switch(decisao) {
        case '1': const novoNome = prompt("Digite o novo nome:"); atualizarNome(nome, telefone, novoNome); nomeEditado = novoNome; break;
        case '2': const novoTel = prompt("Digite o novo telefone:"); atualizarTel(nome, telefone, novoTel); telEditado = novoTel; break;
        case '3' || null: break;
        default: alert('Opção Inválida. Tente Novamente.')
    }
}

function atualizarNome(nome, telefone, novoNome) {
    // ATUALIZAR O NOME
    let nomeAnt = nome;
    favoritos.forEach(favorito => {
        if(favorito.nome === nome && favorito.telefone === telefone) {
            favorito.nome = novoNome;
        }
    })
    contatos.forEach(contato => {
        if(contato.nome === nome && contato.telefone === telefone) {
            contato.nome = novoNome;
            nome = novoNome;
        }
    })
    localStorage.setItem("agenda", JSON.stringify(contatos))
    localStorage.setItem("favoritos", JSON.stringify(favoritos))

    const displayInfos = document.querySelector('.display_infos')
    const cardContato = displayInfos.querySelectorAll('.card-contato')
    cardContato.forEach(card => {
        const h4nome = card.querySelector('.card-contato_nome');
        const h5tel = card.querySelector('.card-contato_tel');
        if (h4nome.textContent == nomeAnt && h5tel.textContent == telefone){
            h4nome.textContent = novoNome;
        }
    })
}

function atualizarTel(nome, telefone, novoTel) {
    let telAnt = telefone;
    favoritos.forEach(favorito => {
        if(favorito.nome === nome && favorito.telefone === telefone) {
            favorito.telefone = novoTel;
        }
    })
    contatos.forEach(contato => {
        if(contato.nome === nome && contato.telefone === telefone) {
            contato.telefone = novoTel;
            telefone = novoTel;
        }
    })
    localStorage.setItem("agenda", JSON.stringify(contatos))
    localStorage.setItem("favoritos", JSON.stringify(favoritos))

    const displayInfos = document.querySelector('.display_infos')
    const cardContato = displayInfos.querySelectorAll('.card-contato')
    cardContato.forEach(card => {
        const h4nome = card.querySelector('.card-contato_nome');
        const h5tel = card.querySelector('.card-contato_tel');
        if (h4nome.textContent == nome && h5tel.textContent == telAnt){
            h5tel.textContent = novoTel;
        }
    })
}

function retornarNome(novo) {
    nomeEditado = novo;
    return nomeEditado;
}

function retornarTel(novo) {
    telEditado = novo;
    return telEditado;
}


function removerContato(nome, telefone) {
    let confirmacao = window.confirm('Deseja realmente excluir esse contato?')
    if(confirmacao) {
        contatos.forEach((contato, index) => {
            if(contato.nome === nome && contato.telefone === telefone) {
                contatos.splice(index, 1);
            }
        })
        favoritos.forEach((favorito, index) => {
            if(favorito.nome === nome && favorito.telefone === telefone) {
                favoritos.splice(index, 1) 
            }
        })
        const displayInfos = document.querySelector('.display_infos')
        const cardContato = displayInfos.querySelectorAll('.card-contato')
        cardContato.forEach(card => {
            const h4nome = card.querySelector('.card-contato_nome');
            const h5tel = card.querySelector('.card-contato_tel');
            if (h4nome.textContent == nome && h5tel.textContent == telefone){
                card.remove();
            }
        })
        localStorage.setItem("agenda", JSON.stringify(contatos))
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
        
    }
}