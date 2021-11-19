package wyu17.backend;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

public interface SectionCodeWithoutOptionsRepository extends CrudRepository<SectionCodeWithoutOptions, Integer> {
    @Query(value = "SELECT s FROM SectionCodeWithoutOptions s WHERE s.section.major.degree.dcode = :dcode AND s.section.major.mcode IN :mcodes AND s.section.sectionName IN :sections")
    List<SectionCode> findByDegreeMajorsSections(@Param("dcode") String dcode, @Param("mcodes") List<String> mcodes, @Param("sections") List<String> sections);
 }