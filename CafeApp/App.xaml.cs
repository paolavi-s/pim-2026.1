using CafeApp.Services;

namespace CafeApp;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        ThemeService.Inicializar();   // aplica o tema salvo (claro ou escuro)
    }

    protected override Window CreateWindow(IActivationState? activationState)
        => new Window(new AppShell());
}
