using MediatR;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Features
{
    public class AddPlayerCommand : IRequest<Player>
    {
        public required string Name { get; set; }
    }

    public class AddPlayerCommandHandler : IRequestHandler<AddPlayerCommand, Player>
    {
        private readonly ApplicationDbContext _context;

        public AddPlayerCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Player> Handle(AddPlayerCommand request, CancellationToken cancellationToken)
        {
            var player = new Player
            {
                Name = request.Name
            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync(cancellationToken);

            return player;
        }
    }
}
