
namespace Bouvet_Shenanigans.Api.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> Complete();
        bool HasChanged();
    }
}