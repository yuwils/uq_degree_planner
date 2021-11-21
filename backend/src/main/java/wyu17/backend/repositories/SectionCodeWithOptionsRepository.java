package wyu17.backend;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

public interface SectionCodeWithOptionsRepository extends CrudRepository<SectionCodeWithOptions, Integer> {
    @Query(value = "SELECT s FROM SectionCodeWithOptions s WHERE s.section.major.degree.dcode IN :dcodes AND s.section.major.mcode IN :mcodes AND s.section.sectionName IN :sections")
    List<SectionCode> findByDegreeMajorsSections(@Param("dcodes") List<String> dcodes, @Param("mcodes") List<String> mcodes, @Param("sections") List<String> sections);
 }