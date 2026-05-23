using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nekoffee.Data;
using nekoffee.Dtos;
using nekoffee.Models;

namespace nekoffee.EndPoints;

public static class EndPoints
{
    const string GetEndpointName = "GetNome";

    public static void MapClientesEndPoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/clients");

        // GET: Retornar todos os clientes
        grupo.MapGet("/", async (ClientesContexto db) => 
            await db.Clientes.ToListAsync());

        // GET por Id: Retornar cliente específico
        grupo.MapGet("/{id}", async (int id, ClientesContexto db) =>
        {
            var cliente = await db.Clientes.FindAsync(id);
            return cliente is null
                ? Results.NotFound("Nenhum cliente encontrado com esse ID.")
                : Results.Ok(cliente);
        }).WithName(GetEndpointName);

        // POST: Criar novo cliente
        grupo.MapPost("/", async (CriarCliente novoCliente, ClientesContexto db) =>
        {
            Clientes cliente = new()
            {
                Nome_Cliente = novoCliente.Nome_Cliente,
                Sobrenome    = novoCliente.Sobrenome,
                Idade        = novoCliente.Idade,
                Cpf_Cliente  = novoCliente.Cpf_Cliente,
                Telefone     = novoCliente.Telefone,
                Email        = novoCliente.Email     
            };

            db.Clientes.Add(cliente);
            await db.SaveChangesAsync();

            // ✅ corrigido: string interpolada correta
            return Results.Created($"/clients/{cliente.Id_Cliente}", cliente);
        });

        // PUT: Atualizar cliente existente
        grupo.MapPut("/{id}", async (int id, AtualizarCliente clienteAtualizado, ClientesContexto db) =>
        {
            var cliente = await db.Clientes.FindAsync(id);
            if (cliente is null) return Results.NotFound();

            cliente.Nome_Cliente = clienteAtualizado.Nome_Cliente;
            cliente.Sobrenome    = clienteAtualizado.Sobrenome;
            cliente.Idade        = clienteAtualizado.Idade;
            cliente.Cpf_Cliente  = clienteAtualizado.Cpf_Cliente;
            cliente.Telefone     = clienteAtualizado.Telefone;
            cliente.Email        = clienteAtualizado.Email;    

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        // DELETE: Remover cliente
        grupo.MapDelete("/{id}", async (int id, ClientesContexto db) =>
        {
            var cliente = await db.Clientes.FindAsync(id);
            if (cliente is null) return Results.NotFound();

            db.Clientes.Remove(cliente);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}