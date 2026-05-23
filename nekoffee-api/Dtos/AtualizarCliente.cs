using System.ComponentModel.DataAnnotations;

namespace nekoffee.Dtos;

public record class AtualizarCliente
(
    [Required][StringLength(50)] string Nome_Cliente,
    [Required][StringLength(70)] string Sobrenome,
    [Required][Range(1, 100)] int Idade,
    [Required][StringLength(14)] string Cpf_Cliente,
    string Telefone,
    string Email
);
