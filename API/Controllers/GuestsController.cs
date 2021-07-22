using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GuestsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _dataContext;
        public GuestsController(IUnitOfWork unitOfWork, IMapper mapper,
        

        IPhotoService photoService, UserManager<AppUser> userManager,DataContext dataContext)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
    {
        var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
        userParams.CurrentUsername = User.GetUsername();
        // this to get the logged in user gender
        if (string.IsNullOrEmpty(userParams.Gender))
            userParams.Gender = gender == "معلم" ? "معلمة" : "معلم";

        var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);

        Response.AddPaginationHeader(
            users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

        return Ok(users);
    }
    [HttpGet("{username}", Name = "GetGuest")]
    public async Task<ActionResult<MemberDto>> GetGuest(string username)
    {
        var currentUsername = User.GetUsername();
        return await _unitOfWork.UserRepository.GetMemberAsync(username, isCurrentUser: currentUsername == username);
        // before photoapproval
        // return await _unitOfWork.UserRepository.GetMemberAsync(username);
    }

    [HttpPut("{username}", Name = "UpdateBalance")]
    public async Task<ActionResult> UpdateBalanceGuest(string username)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
         var updatedUser=  await _dataContext.Users
            .SingleOrDefaultAsync(x => x.UserName == username);
        if (user.Balance > 0)
        {
            updatedUser.Balance -= 1;
           await _dataContext.SaveChangesAsync();
        }
        else
        {
            return NoContent();
        }
        return Ok();
        // before photoapproval
        // return await _unitOfWork.UserRepository.GetMemberAsync(username);
    }

}
}