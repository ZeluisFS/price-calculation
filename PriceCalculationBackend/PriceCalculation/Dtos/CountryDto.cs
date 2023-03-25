namespace PriceCalculation.Dtos
{
    public class CountryDto
    {
        public string Code { get; set; }
        public string Value { get; set; }
    }

    public class CountryWithVatRatesDto : CountryDto
    {
        public IReadOnlyCollection<int> VatRates { get; set; }
    }
}
