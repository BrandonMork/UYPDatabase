package UYPDatabase.site.common.user;


import UYPDatabase.site.JDBC;
import UYPDatabase.site.common.AllDto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;


@Repository
public class UserDao {

    public LoginDto login(String username, String password) throws SQLException, ClassNotFoundException {
        LoginDto temp = new LoginDto(username, password, "user", true);
        JDBC j = new JDBC();
        return j.login(username,password);
    }

    public UserDto getUserDetails(String username) throws SQLException, ClassNotFoundException {
        JDBC j = new JDBC();
        return j.getUserDetails(username);

    }

    public void updateUser(UserDto userDto) throws SQLException, ClassNotFoundException {
        JDBC j = new JDBC();
        j.updateuser(userDto);
    }

}


