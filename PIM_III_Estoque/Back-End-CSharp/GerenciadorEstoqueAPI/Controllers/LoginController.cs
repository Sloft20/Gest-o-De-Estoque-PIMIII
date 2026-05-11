using Microsoft.AspNetCore.Mvc;

namespace GerenciadorEstoque.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        public class LoginRequest { public string? Email { get; set; } public string? Senha { get; set; } }
        [HttpPost]
        public IActionResult Autenticar([FromBody] LoginRequest login)
        {
            // Validação fictícia simples
            if (login.Email == "admin" && login.Senha == "123")
            {
                return Ok(new { mensagem = "Acesso Permitido" });
            }
            return Unauthorized(new { mensagem = "Usuário ou senha inválidos." });
        }
    }
}