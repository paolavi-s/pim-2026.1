using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyModel;
using nekoffee.Data;
using nekoffee.Dtos;
using nekoffee.Models;

[ApiController]
[Route("api/controller")]

public class ClientesController : ControllerBase
{
    private readonly ClientesContexto _context;

    public ClientesController(ClientesContexto context)
    {
        _context = context;
    }

    [HttpPost("verificar-ou-cadastrar")]
    public async Task<IActionResult> VerificarOuCadastrar([FromBody] Cliente dto)
    {
        var clienteExistente = await _context.Clientes.FirstOrDefaultAsync(c => c.Cpf_Cliente == dto.Cpf_Cliente || c.Email == dto.Email);

        if(clienteExistente != null)
        {
            //Cliente encontrado - retorna os dados dele

            return Ok(new
            {
                encontrado = true,
                mensagem = "Cliente já cadastrado.",
                cliente = clienteExistente
            });
        }

            // Não encontrado = cria novo cliente

            var novoCliente = new Clientes
            {
                Nome_Cliente = dto.Nome_Cliente,
                Sobrenome = dto.Sobrenome,
                Idade = dto.Idade,
                Cpf_Cliente = dto.Cpf_Cliente,
                Telefone = dto.Telefone,
                Email = dto.Email
            };

            _context.Clientes.Add(novoCliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(VerificarOuCadastrar), new
            {
                encontrado = false,
                mensagem = "Cliente cadastrado com sucesso.",
                cliente = novoCliente
            });

    }
}