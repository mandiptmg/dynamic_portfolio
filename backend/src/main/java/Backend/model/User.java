package Backend.model;

import Backend.validation.ValidPassword;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Name must not be blank")
  @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
  private String name;

  @Email(message = "Email should be valid")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "Password must not be blank")
  @ValidPassword
  @Size(min = 8, message = "Password must be at least 8 characters long")
  private String password;

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
  private RefreshToken refreshToken;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id")
  private Role role;

}
