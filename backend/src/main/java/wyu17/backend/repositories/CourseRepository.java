package wyu17.backend;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course,String> {
    @Query(value = "SELECT c FROM Course c WHERE c.code IN :codes")
    List<Course> findAllWithCodes(@Param("codes") List<String> codes);
 }