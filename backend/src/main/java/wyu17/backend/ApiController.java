package wyu17.backend;

import java.sql.ResultSet;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class ApiController {

	// Wrappers for the information returned in the get mapping functions
	public class DegreeNameWrapper {

		private ArrayList<Degree> degrees;
	
		public DegreeNameWrapper(ArrayList<Degree> degrees) {
			this.degrees = degrees;
		}

		public ArrayList<Degree> getDegrees() {
			return degrees;
		}
	}

	public class DegreeMajorsWrapper {

		private ArrayList<DegreeMajors> degrees;
	
		public DegreeMajorsWrapper(ArrayList<DegreeMajors> degrees) {
			this.degrees = degrees;
		}

		public ArrayList<DegreeMajors> getDegrees() {
			return degrees;
		}
	}

	public class MajorWrapper {

		private ArrayList<DegreeMajors> degrees;
	
		public MajorWrapper(ArrayList<DegreeMajors> degrees) {
			this.degrees = degrees;
		}

		public ArrayList<DegreeMajors> getDegrees() {
			return degrees;
		}
	}

	public class SectionWrapper {

		private ArrayList<Section> degrees;
	
		public SectionWrapper(ArrayList<Section> degrees) {
			this.degrees = degrees;
		}

		public ArrayList<Section> getDegrees() {
			return degrees;
		}
	}

	public class OptionalWrapper {
		private ArrayList<Course> courses;
		private Boolean optional = true;
		private String name;

		public OptionalWrapper(ArrayList<Course> courses, String name) {
			this.courses = courses;
			this.name = name;
		}

		public ArrayList<Course> getCourse() {
			return courses;
		}
		
		public boolean getOptional() {
			return optional;
		}

		public String getName() {
			return name;
		}
	}

	@Autowired
	JdbcTemplate jdbcTemplate;

	// Retrieves all degrees from the database (currently only retrieves a subset from the includedDegrees, since not all degrees )
	@GetMapping("/singleDegrees")
	public DegreeNameWrapper allDegrees() {
		ArrayList degrees = new ArrayList<Degree>();
		// For now we only allow degrees, since not all of them are ready
		jdbcTemplate.query("SELECT dcode, name, unit FROM degrees where dcode IN (SELECT dcode from includedDegrees)", (rs, rowNum) -> 
		new Degree(rs.getString("dcode"), rs.getString("name"), rs.getInt("unit"))).forEach(degree -> degrees.add(degree));
		DegreeNameWrapper dnw = new DegreeNameWrapper(degrees);
		return dnw;
	}

	// Returns the constraints of a degree given a degree code
	@GetMapping("/degreeConstraint")
	public ArrayList<String> getConstraint(@RequestParam String dcode) {
		ArrayList constraints = new ArrayList<String>();
		jdbcTemplate.query("SELECT constraintColumn FROM constraints WHERE dcode = ?", new Object[] {dcode}, (rs, rowNum) -> 
		rs.getString("constraintColumn")).forEach(constraint -> constraints.add(constraint));
		return constraints;
	}

	// Returns the degree options of a degree (e.g how many majors/minors/extended majors can be taken) given its degree code
	@GetMapping("/degreeStructures")
	public DegreeMajorsWrapper degreeStructures(@RequestParam String code) {
		ArrayList degrees = new ArrayList<DegreeMajors>();
		jdbcTemplate.query("SELECT majors, minors, emaj FROM degreeopts WHERE dcode = ?", new Object[] { code }, (rs, rowNum) -> 
		new DegreeMajors(code, rs.getInt("majors"), rs.getInt("minors"), rs.getInt("emaj"))).forEach(degree -> degrees.add(degree));
		DegreeMajorsWrapper dmw = new DegreeMajorsWrapper(degrees);
		return dmw;
	}

	// Returns information about a course given its course code
	@GetMapping("/course")
	public ArrayList<Course> getCourse(@RequestParam String code) {
		ArrayList courses = new ArrayList<Course>();
		jdbcTemplate.query("SELECT title, units, sem1, sem2, summer, prereq, incomp FROM courses WHERE code = ?", new Object[] { code }, (rs, rowNum) -> 
		new Course(code, rs.getString("title"), rs.getInt("units"), rs.getInt("sem1"), rs.getInt("sem2"), rs.getInt("summer"), 
		rs.getString("prereq"), rs.getString("incomp"))).forEach(course -> courses.add(course));
		return courses;
	}


	@GetMapping("/majors")
	public MajorWrapper getMajors(@RequestParam String code, String type) {
		ArrayList courses = new ArrayList<Course>();
		jdbcTemplate.query("SELECT mcode, name,units FROM majors WHERE dcode = ? AND type = ?", new Object[] { code, type }, (rs, rowNum) -> 
		new DegreeMajor(rs.getString("mcode"), rs.getString("name"), rs.getInt("units"))).forEach(course -> courses.add(course));
		MajorWrapper mwrp = new MajorWrapper(courses);
		return mwrp;
	}

	// Given a degree and major gets all sections associated with that major
	@GetMapping("/sections")
	public SectionWrapper getSections(@RequestParam String dcode, String mcode) {
		ArrayList sections = new ArrayList<Section>();
		jdbcTemplate.query("SELECT mcode, section, min, max FROM sections WHERE dcode = ? and mcode = ?", new Object[] { dcode, mcode }, (rs, rowNum) -> 
		new Section(rs.getString("mcode"), rs.getString("section"), rs.getInt("min"), rs.getInt("max"))).forEach(section -> sections.add(section));
		SectionWrapper swrp = new SectionWrapper(sections);
		return swrp;
	}

	// Given a degree, major and section gets all the course codes for that section (including alternatives like MATH1051 OR MATH1071)
	@GetMapping("/sectionCodes")
	public ArrayList<Object> getSectionCodes(@RequestParam String dcode, String mcode, String name) {
		ArrayList initialCodes = new ArrayList<String>();
		jdbcTemplate.query("SELECT code FROM sectionCodes WHERE dcode = ? AND mcode = ? AND section = ?", new Object[] { dcode, mcode, name }, (rs, rowNum) ->
		rs.getString("code")).forEach(code -> initialCodes.add(code));
		ArrayList courses = new ArrayList<Object>();
		for (int i = 0; i < initialCodes.size(); i++) {
			String code = (String) initialCodes.get(i);
			// Single course codes will have a length of 8 while optional codes will be > 8
			if (code.length() != 8) {
				ArrayList optionComps = new ArrayList<String>();
				jdbcTemplate.query("SELECT code FROM interX WHERE optionCode = ?", new Object[] { code }, (rs, rowNum) ->
				rs.getString("code")).forEach(optionCode -> optionComps.add(optionCode));
				ArrayList optionCourses = new ArrayList<Course>();
				for (int j = 0; j < optionComps.size(); j++) {
					ArrayList optionCourse = getCourse((String) optionComps.get(j));
					if (optionCourse.size() > 0) {
						optionCourses.add(optionCourse.get(0));
					}
				}
				OptionalWrapper owr = new OptionalWrapper(optionCourses, code);
				courses.add((Object) owr);
			} else {
				ArrayList courseDesc = getCourse(code);
				if (courseDesc.size() > 0) {
					courses.add((Object) courseDesc.get(0));
				}
			}
		}
		return courses;
	}
}