using Microsoft.EntityFrameworkCore;
using MediatR;
using WebAPI.Models;
using WebAPI.Data;

namespace WebAPI.Features
{
    public class GetPlayersQuery : IRequest<IEnumerable<Player>>
    {
    }

    public class GetPlayersQueryHandler : IRequestHandler<GetPlayersQuery, IEnumerable<Player>>
    {
        private readonly ApplicationDbContext _context;

        public GetPlayersQueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> Handle(GetPlayersQuery request, CancellationToken cancellationToken)
        {
            var players = await _context.Players.ToListAsync(cancellationToken);
            return players;
        }
    }
}
