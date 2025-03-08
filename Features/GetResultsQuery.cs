using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Data;

namespace WebAPI.Features
{
    public class GetResultsQuery : IRequest<IEnumerable<Result>>
    {
    }

    public class GetResultsQueryHandler : IRequestHandler<GetResultsQuery, IEnumerable<Result>>
    {
        private readonly ApplicationDbContext _context;

        public GetResultsQueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Result>> Handle(GetResultsQuery request, CancellationToken cancellationToken)
        {
            var results = await _context.Results.ToListAsync(cancellationToken);
            return results;
        }
    }
}
