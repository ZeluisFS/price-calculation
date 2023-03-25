using PriceCalculation.Business.Models;

namespace PriceCalculation.Dtos.Mappers
{
    public static class CountryMapper
    {
        public static CountryWithVatRatesDto? ToDto(this CountryWithVatRates model)
        {
            return model == null ? null : new CountryWithVatRatesDto
            {
                Code = model.Code,
                Value = model.Value,
                VatRates = model.VatRates
            };
        }

        public static IReadOnlyCollection<CountryWithVatRatesDto?>? ToDto(this IReadOnlyCollection<CountryWithVatRates> model)
        {
            return model == null ? null : model.Select(m => m.ToDto()).ToList();
        }
    }
}
