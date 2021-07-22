using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }

        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }


//  phonenumber & email already exists in Micorsoft Identity
        public string Major { get; set; }
        public bool IsVerified { get; set; } = false;
        public DateTime VerifiedDate { get; set; } = DateTime.Now.Date;
        public int Balance { get; set; }= 0;
        // overrrided the attribute on asp identity to match MemberDto due to different datatypes
        public new string  PhoneNumber { get; set; }
        public string Nationality { get; set; }
        //account is initially active
        public bool AccountStatus { get; set; } = true;

    

    }
}