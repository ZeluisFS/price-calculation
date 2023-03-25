using MediatR;
using PriceCalculation.Business.Models;

namespace PriceCalculation.Business.Queries
{
    public class GetCountryListQuery : IRequest<IReadOnlyCollection<CountryWithVatRates>>
    {
        public class GetCountryListQueryHandler : IRequestHandler<GetCountryListQuery, IReadOnlyCollection<CountryWithVatRates>>
        {
            public GetCountryListQueryHandler()
            {

            }

            public async Task<IReadOnlyCollection<CountryWithVatRates>> Handle(GetCountryListQuery query, CancellationToken ct)
            {
                return new List<CountryWithVatRates>()
                {
                    new CountryWithVatRates
                    {
                        Code = "AT",
                        Value = "Austria",
                        VatRates = new int[] {5, 10, 13, 20}
                    },
                    new CountryWithVatRates
                    {
                        Code = "GB",
                        Value = "United Kingdom",
                        VatRates = new int[] {5, 20}
                    },
                    new CountryWithVatRates
                    {
                        Code = "PT",
                        Value = "Portugal",
                        VatRates = new int[] {6, 13, 23}
                    },
                    new CountryWithVatRates
                    {
                        Code = "SG",
                        Value = "Singapore",
                        VatRates = new int[] {7}
                    }
                };
            }
        }
    }
}
