package wyu17.backend;
import java.util.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;

// Focus on the happy paths and the repo's as the api controller is essentially just repo queries
@DataJpaTest
public class ApiControllerTest {
    @Autowired
    SectionRepository sectionRepository;

    @Test
    public void testGetSections() throws Exception {
        List<String> degrees = new ArrayList(Arrays.asList("2000"));
        List<String> majors = new ArrayList(Arrays.asList("MCODE1"));
        List<Section> sections = sectionRepository.findSectionOfDegreeWithMajors(degrees, majors);
        assertEquals(sections.size(), 1);
        assertEquals(sections.get(0).getMin(), 0);
        assertEquals(sections.get(0).getMax(), 10);
        assertTrue(sections.get(0).getDcode().equals("2000"));
        assertTrue(sections.get(0).getMcode().equals("MCODE1"));
        assertTrue(sections.get(0).getSectionName().equals("sNameTest1"));
    }

    @Test
    public void testGetSectionCodes() throws Exception {
        List<String> degrees = new ArrayList(Arrays.asList("2000"));
        List<String> majors = new ArrayList(Arrays.asList("MCODE1"));

        List<Section> sections = sectionRepository.findSectionOfDegreeWithMajors(degrees, majors);
        
        assertEquals(sections.size(), 1);
        Set<SectionCodeWithOptions> codeWithOptions = sections.get(0).getSectionCodesWithOptions();
        assertEquals(codeWithOptions.size(), 1);

        SectionCodeWithOptions onlyOptionedSectionCode = codeWithOptions.iterator().next();
        assertTrue(onlyOptionedSectionCode.getOptionCode().equals("TEST1201+TEST1301"));

        Set<Course> optionedCourses = onlyOptionedSectionCode.getCourses();
        assertEquals(optionedCourses.size(), 2);
        assertTrue(optionedCourses.stream().anyMatch(foo -> foo.getCode().equals("TEST1201")));
        assertTrue(optionedCourses.stream().anyMatch(foo -> foo.getCode().equals("TEST1301")));

        Set<SectionCodeWithoutOptions> codeWithoutOptions = sections.get(0).getSectionCodesWithoutOptions();
        assertEquals(codeWithoutOptions.size(), 1);
        SectionCodeWithoutOptions onlySectionCode = codeWithoutOptions.iterator().next();
        assertTrue(onlySectionCode.getCourse().getCode().equals("TEST1501"));
    }
}