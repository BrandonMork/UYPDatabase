package UYPDatabase.site.common.guest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class GuestDao {

    public void apply(GuestDto guestDto){
        System.out.println("Guest is applying!!!!" + guestDto);
    }

}

