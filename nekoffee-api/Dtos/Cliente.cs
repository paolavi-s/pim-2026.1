using System.ComponentModel.DataAnnotations;

namespace nekoffee.Dtos;

public record class Cliente
(
    string Nome_Cliente,
    string Sobrenome,
    int Idade,
    string Cpf_Cliente,
    string Telefone,
    string Email
);
