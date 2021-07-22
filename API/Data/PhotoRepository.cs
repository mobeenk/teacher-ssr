using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _dataContext;
        public PhotoRepository(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        public async Task<Photo> GetPhotoById(int id)
        {
            var photo = await _dataContext.Photos
            .IgnoreQueryFilters()
            .SingleOrDefaultAsync( p => p.Id == id);
            return photo;
        }

        public async Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos()
        {
            return await _dataContext.Photos.IgnoreQueryFilters()
                .Where(p => p.IsApproved == false)
                .Select(u => new PhotoForApprovalDto
                {
                    Id = u.Id,
                    Url=u.Url,
                    Username=u.AppUser.UserName,
                    IsApproved=u.IsApproved

                }).ToListAsync();
        }
        public void RemovePhoto(Photo photo)
        {
            _dataContext.Photos.Remove(photo);
        }
    }
}