using Microsoft.AspNetCore.Mvc;
using GerenciadorEstoque.Models;
using System.Linq;

namespace GerenciadorEstoque.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetResumo()
        {
            // Calcula os dados REAIS varrendo a lista do nosso banco simulado
            int total = BancoDeDados.Produtos.Count;
            int emBaixa = BancoDeDados.Produtos.Count(p => p.Quantidade < 10);
            
            // Aqui ele usa o Polimorfismo! Chama o método CalcularValorEmEstoque de cada produto
            decimal valor = BancoDeDados.Produtos.Sum(p => p.CalcularValorEmEstoque());

            var resumo = new 
            {
                totalItens = total,
                itensEmBaixa = emBaixa,
                valorTotal = valor
            };
            
            return Ok(resumo);
        }
    }
}