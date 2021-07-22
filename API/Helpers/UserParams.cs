namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        // public int MinAge { get; set; } = 18;
        // public int MaxAge { get; set; } = 150;
        public string OrderBy { get; set; } = "lastActive";
        public string Country { get; set; }
        public string City { get; set; }
        public string Major { get; set; }
        public bool isVerified { get; set; }
        // for admin search
        public string Username { get; set; }

        
    }
}