using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace nekoffee.Models;

public class Clientes
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // banco gera o ID do cliente de forma automática
        public int Id_Cliente{get; set;}
        public required string Nome_Cliente {get; set;}
        public required string Sobrenome {get; set;}
        public int Idade {get; set;}
        public required string Cpf_Cliente {get; set;}
        public required string Telefone{get; set;}
        public required string Email{get; set;}
}
