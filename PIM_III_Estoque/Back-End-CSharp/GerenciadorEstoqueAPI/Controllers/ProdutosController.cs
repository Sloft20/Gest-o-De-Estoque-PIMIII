using Microsoft.AspNetCore.Mvc;
using GerenciadorEstoque.Models;
using System.Linq;

namespace GerenciadorEstoque.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        // GET: api/produtos 
        [HttpGet]
        public IActionResult GetTodos()
        {
            return Ok(BancoDeDados.Produtos); // Puxa do banco global
        }

        // POST: api/produtos 
        [HttpPost]
        public IActionResult Cadastrar([FromBody] ProdutoAlimenticio novoProduto)
        {
            if (novoProduto == null) return BadRequest("Dados inválidos.");

            novoProduto.Id = BancoDeDados.ProximoId++;
            BancoDeDados.Produtos.Add(novoProduto); // Salva no banco global

            return Ok(new { mensagem = "Produto cadastrado com sucesso!" });
        }

        // PUT: api/produtos/1 
        [HttpPut("{id}")]
        public IActionResult Editar(int id, [FromBody] ProdutoAlimenticio produtoEditado)
        {
            var produto = BancoDeDados.Produtos.FirstOrDefault(p => p.Id == id);
            if (produto == null) return NotFound("Produto não encontrado.");

            produto.Nome = produtoEditado.Nome;
            produto.CodigoBarras = produtoEditado.CodigoBarras;
            produto.Quantidade = produtoEditado.Quantidade;
            produto.Preco = produtoEditado.Preco;

            return Ok(new { mensagem = "Produto atualizado!" });
        }
    }
}