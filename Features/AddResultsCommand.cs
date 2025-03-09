using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Features
{
    public class AddResultsCommand : IRequest<List<Result>>
    {
        public required List<ResultDto> Results { get; set; }
    }

    public class ResultDto
    {
        public int PlayerId { get; set; }
        public int Score { get; set; }
        public int GamesPlayed { get; set; }
    }

    public class AddResultsCommandHandler : IRequestHandler<AddResultsCommand, List<Result>>
    {
        private readonly ApplicationDbContext _context;

        public AddResultsCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Result>> Handle(AddResultsCommand request, CancellationToken cancellationToken)
        {
            var players = await _context.Players.ToListAsync(cancellationToken);

            var resultsToAdd = request.Results
                .Where(r => players.Any(p => p.PlayerId == r.PlayerId)) // Ensure PlayerId exists
                .Select(r => new Result
                {
                    PlayerId = r.PlayerId,
                    Score = r.Score,
                    GamesPlayed = r.GamesPlayed
                })
                .ToList();

            if (resultsToAdd.Count == 0)
            {
                return new List<Result>(); // No valid players found
            }

            _context.Results.AddRange(resultsToAdd);
            await _context.SaveChangesAsync(cancellationToken);

            return resultsToAdd;
        }
    }
}
