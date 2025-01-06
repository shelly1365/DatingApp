using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> ActionRegister([FromBody] RegisterDto registerDto){
            if(await UserExists(registerDto.UserName)) return BadRequest("Username Is Already Taken!");
            using var hmac = new HMACSHA512();
            AppUser user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser([FromBody] LoginDto loginDto){
           var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
           if(user == null) return Unauthorized("Invalid Username");

           using var hmac = new HMACSHA512(user.PasswordSalt);

           var copmuteHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
           for(int i = 0; i < copmuteHash.Length; i++){
            if(copmuteHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
           }

           return new UserDto{
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
           };
        }

        public async Task<bool> UserExists(string username){
           return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}