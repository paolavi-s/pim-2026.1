# Nekoffee Mobile

    App desenvolvida para a Gateferia Nekoffe, com o objetivo de adicionar praticidade e mobilidade aos processos de reservas e adoção realizados no estabelecimento!!

## Estrutura

```
CafeApp/
├── App.xaml / App.xaml.cs          -> registra Cores.xaml e Estilos.xaml
├── AppShell.xaml                   -> rotas: inicio, cardapio, reservas, adocao
├── MauiProgram.cs
├── Controls/BarraNavegacao         -> barra inferior compartilhada (navega com Shell) e controle de Dark Mode
├── Models/                         -> Categoria.cs, Produto.cs, Gatos.cs, CandituraAdocao.cs
├── ViewModels/                     -> Cardapio, Reservas, Gatos, Adoção e Login
├── Views/                          -> InicioPage, Cardapio, Reservas, Adoção, Gatos e Login
├── Resources                       -> Cores.xaml, Estilos.xaml, além de imagens utilizadas no app e ícones
└── Platforms/                      -> Android, IOS e Windows
```

## Funcional no app atualmente

- Navegação entre as 4 abas pela barra inferior (`Shell.Current.GoToAsync("//rota")`).
- Filtro por categoria no Cardápio, com destaque laranja na categoria selecionada.
- Validação dos formulários de Reservas e Adoção.
- Consulta no Banco de Dados, para verificar se uma data da aba "Reservas" já foi reservada por outro cliente

