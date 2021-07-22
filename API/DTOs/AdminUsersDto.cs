using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class AdminUsersDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public List<string> Roles { get; set; }
        public string Gender { get; set; }
    }
}