var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços ao contêiner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// LINHA REMOVIDA: builder.Services.AddSwaggerGen();

// Configuração do CORS que você adicionou
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy => {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// LINHAS REMOVIDAS: if (app.Environment.IsDevelopment()) { ... }

app.UseHttpsRedirection();

app.UseCors("PermitirTudo"); 

app.UseAuthorization();

app.MapControllers();

app.Run();