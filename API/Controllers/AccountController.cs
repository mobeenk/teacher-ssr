using System;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMailService _mailService;

        private readonly IConfiguration _configuration;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        

        ITokenService tokenService, IMapper mapper,IMailService mailService, IConfiguration configuration )
        {
            _configuration = configuration;
            _mailService = mailService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }


    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username))
            return BadRequest("Username is taken");

        var user = _mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.Username.ToLower();

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded)
            return BadRequest(result.Errors);

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender,
             Country = user.Country
        };
    }
    // public async void SendMail()
    // {
    //     await _mailService.SendEmailAsync
    //     ("moubien.kayali@gmail.com", "hi", "<h1>test</h1>");
    // }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x =>(   x.UserName  == loginDto.Username.ToLower() || x.Email == loginDto.Username.ToLower()   ) );
        //  var tryaccess = await _userManager.
        if (user == null)
            return Unauthorized("Invalid username");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);
        // if (result.Succeeded)
        // {
        //     await _mailService.SendEmailAsync
        //       ("moubien.kayali@gmail.com", "hi", "<h1>test</h1>");
        // }
        if (!result.Succeeded){
            //  await _userManager.AccessFailedAsync(user);
            //  int failsCount = user.AccessFailedCount;
        //  to return the right error
             if(DateTimeOffset.Now <  user.LockoutEnd){
               
                 return Unauthorized("تم تعليق الحساب");
             }
             else{
                  return Unauthorized("اسم المستخدم أو كلمة المرور خطأ");
             }
            //  
             
            // return BadRequest("nawossnam");
        }
   

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            KnownAs = user.KnownAs,
            Gender = user.Gender,
            Country = user.Country
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }

    [HttpPost("forgot-password-mail")]

    public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync
        (x => x.Email == forgotPasswordDto.Email);

        if (user == null)
            return BadRequest("User doesnt exists");

        // If the user is found AND Email is NOT confirmed
        // 
        if (user != null && !(await _userManager.IsEmailConfirmedAsync(user)))
        {
            // Generate the reset password token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // to fix encoding in browser
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            string url =
             $"{_configuration["AppUrl"]}/ResetPassword?email={forgotPasswordDto.Email}&token={validToken}";

            await _mailService.SendEmailAsync(forgotPasswordDto.Email,
             "Reset Password",
             "<h1>Follow the instructions to reset your password</h1>" +
                $"<p>To reset your password <a href='{url}'>Click here</a></p>");

            return Ok();
        }

        // To avoid account enumeration and brute force attacks, don't
        // reveal that the user does not exist or is not confirmed
        return BadRequest("not found");


    }
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync
        (x => x.Email == resetPasswordDto.Email);

        if (user == null)
            return BadRequest("User doesnt exists");

        if(resetPasswordDto.NewPassword != resetPasswordDto.ConfirmPassword){
            return BadRequest("Password doesnt Match");
        }
        var decodedToken = WebEncoders.Base64UrlDecode(resetPasswordDto.Token);
        string normalToken = Encoding.UTF8.GetString(decodedToken);

        var result = await _userManager.ResetPasswordAsync(user, normalToken,resetPasswordDto.NewPassword);

        if(result.Succeeded)
            return Ok();

        return BadRequest("يجب أن تكون كلمة المرور 8 حروف على الأقل تحتوي على حرف كبير وارقام ورمز");

    }
}
}