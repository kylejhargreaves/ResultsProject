﻿using System;
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

        [HttpPost("results")]
        public async Task<IActionResult> AddResults([FromBody] AddResultsCommand command)
        {
            if (command == null || command.Results == null || command.Results.Count == 0)
            {
                return BadRequest("Invalid or empty results data.");
            }

            var addedResults = await _mediator.Send(command);
            return Ok(new { Results = addedResults });
        }

    }
}
