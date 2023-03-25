using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PriceCalculation.Business.Queries;
using PriceCalculation.Controllers;
using PriceCalculation.Dtos;
using static PriceCalculation.Business.Queries.GetCountryListQuery;

namespace PriceCalculationTest.Queries
{
    public class GetCountryListQueryTest
    {
        private readonly CountryController _controller;
        private readonly GetCountryListQueryHandler _handler;
        private readonly Mock<IMediator> _mediatorMock;

        public GetCountryListQueryTest()
        {
            _handler = new GetCountryListQueryHandler();
            _mediatorMock = new Mock<IMediator>();

            _mediatorMock.Setup(m => m.Send(It.IsAny<GetCountryListQuery>(), It.IsAny<CancellationToken>()))
                .Returns((GetCountryListQuery param, CancellationToken ct) =>
                {
                    return _handler.Handle(param, ct);
                });

            _controller = new CountryController(_mediatorMock.Object);
        }

        [Fact]
        public async Task GetCountryListQueryShouldReturnWithSuccess()
        {
            var response = await _controller.GetCountryListQuery(new CancellationToken());

            _mediatorMock.Verify(m => m.Send(It.IsAny<GetCountryListQuery>(), It.IsAny<CancellationToken>()));

            var okResult = response.Result as OkObjectResult;
            var result = (IReadOnlyCollection<CountryWithVatRatesDto>)okResult!.Value!;

            Assert.NotEmpty(result);
            Assert.Contains(result, item => item.Code == "AT");
            Assert.Contains(result, item => item.Value == "Portugal");
            result.ToList().ForEach(r =>
            {
                Assert.NotEmpty(r.VatRates);
            });
        }
    }
}
