using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        // to return email from reposence in UsersController GET users
        public string Email { get; set; }

        public string PhoneNumber { get; set; }
        public bool IsVerified { get; set; }
        public DateTime VerifiedDate { get; set; }
         public int Balance { get; set; }=0;
        public string Major { get; set; }
        public string Nationality { get; set; }
        public bool AccountStatus { get; set; }
    }
}