namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        // Edit profile added Email
        public string Email { get; set; }
        public string PhoneNumber {get; set ;}
        public string Major { get; set; }
        
         public string Nationality { get; set; }
         public bool AccountStatus { get; set; }
    }
}