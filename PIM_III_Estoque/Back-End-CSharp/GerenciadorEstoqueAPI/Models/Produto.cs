using System;

namespace GerenciadorEstoque.Models
{
    // 1. HERANÇA: Esta é a classe "Pai" (Superclasse). 
    // Ela é abstrata, ou seja, serve de modelo genérico para outros produtos.
    public abstract class Produto
    {
        // 2. ENCAPSULAMENTO: Os dados estão protegidos. 
        // Usamos propriedades (get e set) para controlar como as variáveis são acessadas e modificadas.
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? CodigoBarras { get; set; }
        private int _quantidade; 
        
        public int Quantidade 
        { 
            get { return _quantidade; }
            set 
            { 
                if (value < 0) throw new ArgumentException("A quantidade não pode ser negativa.");
                _quantidade = value;
            }
        }

        public decimal Preco { get; set; }

        // 3. POLIMORFISMO (Parte 1): Método virtual que pode ser modificado pelas classes "Filhas".
        public virtual decimal CalcularValorEmEstoque()
        {
            return Quantidade * Preco;
        }
    }

    // HERANÇA: ProdutoAlimenticio herda de Produto (Tem Id, Nome, etc., e adiciona DataValidade)
    public class ProdutoAlimenticio : Produto
    {
        public DateTime DataValidade { get; set; }

        // POLIMORFISMO (Parte 2): Sobrescrevendo o método original (override).
        // Regra de negócio: Se o alimento estiver perto de vencer (menos de 5 dias), 
        // o valor contábil dele cai pela metade para estimular promoções.
        public override decimal CalcularValorEmEstoque()
        {
            if ((DataValidade - DateTime.Now).TotalDays <= 5)
            {
                return (Quantidade * Preco) * 0.5m; // 50% de desconto no valor de estoque
            }
            return base.CalcularValorEmEstoque();
        }
    }
}