package wyu17.backend;

import java.sql.ResultSet;
import java.util.*;
import java.util.stream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class ApiController {

	@Autowired
	private DegreeRepository DegreeRepository;

	@Autowired
	private DegreeOptionsRepository DegreeOptionsRepository;

	@Autowired
	private CourseRepository CourseRepository;

	@Autowired
	private MajorRepository MajorRepository;

	@Autowired
	private SectionRepository SectionRepository;

	@Autowired
	private SectionCodeWithoutOptionsRepository SectionCodeWithoutOptionsRepository;

	@Autowired
	private SectionCodeWithOptionsRepository SectionCodeWithOptionsRepository;

	// Returns every available degree
	@GetMapping("/singleDegrees")
    public Iterable<IncludedDegree> getDegrees() {
        return DegreeRepository.findAll();
    }

	// Returns the degree options of a degree (e.g how many majors/minors/extended majors can be taken) given its degree code
	@GetMapping("/degreeOptions")
    public Iterable<DegreeOptions> getDegreeOptions(@RequestParam String code) {
        return DegreeOptionsRepository.findByDegree_Dcode(code);
    }

	@GetMapping("/courses")
    public Iterable<Course> getCourses(@RequestParam List<String> codes) {
        return CourseRepository.findAllWithCodes(codes);
    }

	@GetMapping("/majors")
	public Iterable<Major> getMajors(@RequestParam String dcode) {
		return MajorRepository.findByDegree_Dcode(dcode);
	}

	@GetMapping("/sections")
	public Iterable<Section> getSections(@RequestParam List<String> dcodes, @RequestParam List<String> mcodes) {
		return SectionRepository.findSectionOfDegreeWithMajors(dcodes, mcodes);
	}

	// Given a degree, major and section gets all the course codes for that section (including alternatives like MATH1051 OR MATH1071)
	@GetMapping("/sectionCodes")
	public Iterable<SectionCode> getSectionCodes(@RequestParam List<String> dcodes, @RequestParam List<String> mcodes, @RequestParam List<String> sections) {
		List<SectionCode> withoutOptions = SectionCodeWithoutOptionsRepository.findByDegreeMajorsSections(dcodes, mcodes, sections);
		List<SectionCode> withOptions = SectionCodeWithOptionsRepository.findByDegreeMajorsSections(dcodes, mcodes, sections);
		List<SectionCode> allCodes = new ArrayList<SectionCode>();
		allCodes.addAll(withoutOptions);
		allCodes.addAll(withOptions);
		return allCodes;
	} 
}