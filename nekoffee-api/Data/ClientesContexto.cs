using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using nekoffee.Dtos;
using nekoffee.Models;

namespace nekoffee.Data;

public class ClientesContexto : DbContext
{
    public ClientesContexto(DbContextOptions<ClientesContexto> options) : base(options) { }
    public DbSet<Clientes> Clientes {get; set;}
}
