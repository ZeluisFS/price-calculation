namespace PriceCalculation.Business.Models
{
    public class Country
    {
        public string Code { get; set; }
        public string Value { get; set; }

    }

    public class CountryWithVatRates : Country
    {
        public IReadOnlyCollection<int> VatRates { get; set; }
    }
}
