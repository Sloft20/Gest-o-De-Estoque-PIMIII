// app.js - Lógica de Integração Front-end e Back-end (C#)

// ==========================================
// 1. TELA DE LOGIN (index.html)
// ==========================================
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const dadosLogin = { email: email, senha: senha };

        const urlApiCsharp = 'http://localhost:5164/api/login'; 

        fetch(urlApiCsharp, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLogin)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "inicio.html"; 
            } else {
                alert("Usuário ou senha inválidos.");
            }
        })
        .catch(error => {
            console.error('Erro de conexão:', error);
            alert("Erro de conexão. Verifique se o back-end está rodando!");
        });
    });
}

// ==========================================
// 2. TELA DE INÍCIO/DASHBOARD (inicio.html)
// ==========================================
const totalProdutosElement = document.getElementById('totalProdutos');

if (totalProdutosElement) {
    function carregarDadosDashboard() {
        const urlApiDashboard = 'http://localhost:5164/api/dashboard';

        fetch(urlApiDashboard)
            .then(response => {
                if (!response.ok) throw new Error('Erro na API');
                return response.json();
            })
            .then(dados => {
                document.getElementById('totalProdutos').innerText = dados.totalItens;
                document.getElementById('produtosBaixa').innerText = dados.itensEmBaixa;
                document.getElementById('valorEstoque').innerText = dados.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('totalProdutos').innerText = "-";
                document.getElementById('produtosBaixa').innerText = "-";
                document.getElementById('valorEstoque').innerText = "R$ 0,00";
            });
    }
    
    carregarDadosDashboard();
}

// ==========================================
// 3. TELA DE CADASTRO (cadastro.html)
// ==========================================
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();

        const produto = {
            nome: document.getElementById('nome').value,
            codigoBarras: document.getElementById('codigoBarras').value, 
            quantidade: parseInt(document.getElementById('quantidade').value),
            preco: parseFloat(document.getElementById('preco').value)
        };

        const urlApiCadastro = 'http://localhost:5164/api/produtos';

        fetch(urlApiCadastro, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if(response.ok) {
                alert("Produto cadastrado com sucesso no C#!");
                formCadastro.reset();
            } else {
                alert("Erro ao cadastrar produto.");
            }
        })
        .catch(error => console.error('Erro:', error));
    });
}

// ==========================================
// 4. TELA DE GERENCIAMENTO (gerenciamento.html)
// ==========================================
const containerProdutos = document.getElementById('containerProdutos');
let produtosGlobais = []; 

if (containerProdutos) {
    
    function renderizarProdutos(lista) {
        containerProdutos.innerHTML = ''; 
        
        if(lista.length === 0) {
            containerProdutos.innerHTML = '<p style="text-align:center; padding: 20px;">Nenhum produto cadastrado no banco de dados.</p>';
            return;
        }

        lista.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-item';
            
            const corEstoque = produto.quantidade < 10 ? 'color: red; font-weight: bold;' : 'color: #666;';

            card.innerHTML = `
                <div class="produto-info">
                    <h4>${produto.nome}</h4>
                    <p><strong>Cód:</strong> ${produto.codigoBarras || 'Sem código'}</p> 
                    <p>Estoque: <span style="${corEstoque}">${produto.quantidade} un</span> | Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="botoes-acao">
                    <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            `;
            containerProdutos.appendChild(card);
        });
    }

    function buscarProdutosDoBackend() {
        fetch('http://localhost:5164/api/produtos')
            .then(response => response.json())
            .then(dadosRecebidos => {
                produtosGlobais = dadosRecebidos; 
                renderizarProdutos(dadosRecebidos);
            })
            .catch(erro => {
                console.error("Erro ao buscar do C#:", erro);
                containerProdutos.innerHTML = '<p style="text-align:center; padding: 20px; color: red;">Erro de conexão com o servidor.</p>';
            });
    }

    buscarProdutosDoBackend();

    const inputBusca = document.getElementById('buscaProduto');
    if (inputBusca) {
        inputBusca.addEventListener('input', function(e) {
            const termoBuscado = e.target.value.toLowerCase();
            const produtosFiltrados = produtosGlobais.filter(p => p.nome.toLowerCase().includes(termoBuscado));
            renderizarProdutos(produtosFiltrados);
        });
    }
}

function editarProduto(id) {
    window.location.href = 'editar.html?id=' + id;
}

function excluirProduto(id) {
    alert("Função de exclusão visual (Falta o DELETE no C# para excluir de verdade!) ID: " + id);
}

// ==========================================
// 5. TELA DE EDIÇÃO (editar.html)
// ==========================================
const formEditar = document.getElementById('formEditar');

if (formEditar) {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    if (produtoId) {
        fetch('http://localhost:5164/api/produtos')
            .then(res => res.json())
            .then(lista => {
                const produto = lista.find(p => p.id == produtoId);
                if (produto) {
                    document.getElementById('editId').value = produto.id;
                    document.getElementById('editNome').value = produto.nome;
                    document.getElementById('editCodigoBarras').value = produto.codigoBarras; 
                    document.getElementById('editQuantidade').value = produto.quantidade;
                    document.getElementById('editPreco').value = produto.preco;
                } else {
                    alert("Produto não encontrado!");
                    window.location.href = "gerenciamento.html";
                }
            });
    }

    formEditar.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const idAtualizado = document.getElementById('editId').value;
        const dadosAtualizados = {
            id: parseInt(idAtualizado),
            nome: document.getElementById('editNome').value,
            codigoBarras: document.getElementById('editCodigoBarras').value, 
            quantidade: parseInt(document.getElementById('editQuantidade').value),
            preco: parseFloat(document.getElementById('editPreco').value)
        };

        const urlApiEdicao = 'http://localhost:5164/api/produtos/' + idAtualizado;
        
        fetch(urlApiEdicao, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        })
        .then(response => {
            if(response.ok) {
                alert("Produto atualizado com sucesso!");
                window.location.href = "gerenciamento.html";
            }
        })
        .catch(error => console.error('Erro na edição:', error));
    });
}