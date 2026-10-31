using CafeApp.Views;

namespace CafeApp;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        // Páginas abertas "por cima" da aba Adoção (têm botão voltar)
        Routing.RegisterRoute("gato-detalhe", typeof(GatoDetalhePage));
        Routing.RegisterRoute("adocao-form", typeof(AdocaoPage));
    }
}