package wyu17.backend;
import java.util.*;
import org.springframework.data.repository.CrudRepository;

public interface MajorRepository extends CrudRepository<Major, Integer> {
    List<Major> findByDegree_Dcode(String dcode);
 }