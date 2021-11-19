package wyu17.backend;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

public interface SectionRepository extends CrudRepository<Section,Integer> {
    @Query(value = "SELECT s FROM Section s WHERE s.major.degree.dcode = :dcode AND s.major.mcode IN :mcodes")
    List<Section> findSectionOfDegreeWithMajors(@Param("dcode") String dcode, @Param("mcodes") List<String> mcodes);
 }