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
    public class PlayersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PlayersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        
        [HttpGet("players")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            var results = await _mediator.Send(new GetPlayersQuery());
            return Ok(new { Results = results });
        }

        [HttpPost("players")]
        public async Task<ActionResult<Player>> AddPlayer([FromBody] AddPlayerCommand command)
        {
            if (command == null || string.IsNullOrWhiteSpace(command.Name))
            {
                return BadRequest("Player name is required.");
            }

            var newPlayer = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetPlayers), new { id = newPlayer.PlayerId }, newPlayer);
        }

    }
}
