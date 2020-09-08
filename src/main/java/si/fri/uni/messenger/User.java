package si.fri.uni.messenger;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String username;
    private String publicKey;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", publicKey='" + publicKey + '\'' +
                '}';
    }
}
