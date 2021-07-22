using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ResetPasswordDto
    {
        [Required]
        
       public string Token { get; set; } 
       [Required]
       [EmailAddress]
       public string Email { get; set; }
       [Required]
       [StringLength(8,MinimumLength=4)]
       public string NewPassword { get; set; }
       [Required]
       [StringLength(8,MinimumLength=4)]
       public string ConfirmPassword { get; set; }
    }
}