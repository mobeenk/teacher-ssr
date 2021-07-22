using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username, bool isCurrentUser)
        {
            // Ignore Query filter for the current user (GetMemberAsync) so the current user still sees
            // their unapproved photos
            var query = _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .AsQueryable();
            ;

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            return await query.FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            // exclude fetching current logged in user & user Admin
            query = query.Where(u => u.UserName != userParams.CurrentUsername
             && u.UserName != "admin" && u.Gender != "طالب" && u.Gender != "طالبة"
             && u.AccountStatus != false
             );
            
            if (userParams.Gender.Equals("معلمة") || userParams.Gender.Equals("معلم") )
                query = query.Where(u => u.Gender == userParams.Gender);
           

            // var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            // query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            // filter country only if we passed a URL paramater
            // all parameter if passed from userParams.ts then dont filter countries
            if(userParams.Country != null && userParams.Country != "جميع البلدان" )
                query = query.Where(u => u.Country == userParams.Country);
            // filter by city
            if(userParams.City != null && userParams.City != "جميع المدن" )
                query = query.Where(c => c.City == userParams.City);
            // major filter
            if(userParams.Major != null && userParams.Major != "جميع التخصصات")
                query = query.Where(m => m.Major == userParams.Major);
            // by default it's false unless passing parameter as true
            // query = query.Where(iv => iv.IsVerified == userParams.isVerified);



            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(), //source
                    userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Gender).FirstOrDefaultAsync();
        }
//  May delete this
        public async Task<string> GetUserCountry(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Country).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<AppUser> GetUserByPhotoId(int photoId)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .IgnoreQueryFilters()
                .Where(p => p.Photos.Any(p => p.Id == photoId))
                .FirstOrDefaultAsync();
        }
        //Balance
        public async Task<int> GetUserBalance(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Balance).FirstOrDefaultAsync();
        }
    }
}