using Microsoft.Extensions.DependencyInjection;
using PriceCalculation.Business.Queries;

namespace PriceCalculation.Business.IoC
{
    public static class ServiceIoCManager
    {
        public static void RegisterMediatR(IServiceCollection serviceCollection)
        {
            var businessAssembly = AppDomain.CurrentDomain.Load("PriceCalculation.Business");
            serviceCollection.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(businessAssembly));
        }
    }
}
