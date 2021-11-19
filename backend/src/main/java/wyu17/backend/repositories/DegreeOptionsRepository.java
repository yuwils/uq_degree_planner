package wyu17.backend;
import java.util.*;
import org.springframework.data.repository.CrudRepository;

public interface DegreeOptionsRepository extends CrudRepository<DegreeOptions,Integer> {
    List<DegreeOptions> findByDegree_Dcode(String dcode);
 }