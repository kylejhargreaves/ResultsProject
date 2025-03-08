using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Features;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ResultsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("results")]
        public async Task<IActionResult> GetResults()
        {
            var results = await _mediator.Send(new GetResultsQuery());
            return Ok(new { Results = results });
        }

    }
}
