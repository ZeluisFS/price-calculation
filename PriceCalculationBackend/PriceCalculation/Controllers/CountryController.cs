using MediatR;
using Microsoft.AspNetCore.Mvc;
using PriceCalculation.Business.Queries;
using PriceCalculation.Dtos;
using PriceCalculation.Dtos.Mappers;

namespace PriceCalculation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CountryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("list")]
        public async Task<ActionResult<IReadOnlyCollection<CountryWithVatRatesDto>>> GetCountryListQuery(CancellationToken ct)
        {
            var result = await _mediator.Send(new GetCountryListQuery(), ct);
            return Ok(result.ToDto());
        }
    }
}
