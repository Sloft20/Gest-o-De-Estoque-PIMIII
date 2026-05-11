using System.Collections.Generic;

namespace GerenciadorEstoque.Models
{
    // Classe estática para simular o banco de dados na memória
    public static class BancoDeDados
    {
        public static List<Produto> Produtos = new List<Produto>();
        public static int ProximoId = 1;
    }
}