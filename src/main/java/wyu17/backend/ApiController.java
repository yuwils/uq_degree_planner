package wyu17.backend;

import java.sql.ResultSet;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class ApiController {

	// Wrapping the list into a class is apparently more secure
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

	@Autowired
	JdbcTemplate jdbcTemplate;

	@GetMapping("/singleDegrees")
	public DegreeNameWrapper allDegrees() {
		ArrayList degrees = new ArrayList<Degree>();
		jdbcTemplate.query("SELECT dcode, name, unit FROM degrees", (rs, rowNum) -> 
		new Degree(rs.getInt("dcode"), rs.getString("name"), rs.getInt("unit"))).forEach(degree -> degrees.add(degree));
		DegreeNameWrapper dnw = new DegreeNameWrapper(degrees);
		return dnw;
	}

	@GetMapping("/degreeStructures")
	public DegreeMajorsWrapper degreeStructures(@RequestParam int code) {
		ArrayList degrees = new ArrayList<DegreeMajors>();
		jdbcTemplate.query("SELECT majors, minors, emaj FROM degreeopts WHERE dcode = ?", new Object[] { code }, (rs, rowNum) -> 
		new DegreeMajors(code, rs.getInt("majors"), rs.getInt("minors"), rs.getInt("emaj"))).forEach(degree -> degrees.add(degree));
		DegreeMajorsWrapper dmw = new DegreeMajorsWrapper(degrees);
		return dmw;
	}

	@GetMapping("/course")
	public ArrayList<Course> getCourse(@RequestParam String code) {
		ArrayList courses = new ArrayList<Course>();
		jdbcTemplate.query("SELECT title FROM courses WHERE code = ?", new Object[] { code }, (rs, rowNum) -> 
		new Course(rs.getString("title"))).forEach(course -> courses.add(course));
		return courses;
	}


	@GetMapping("/majors")
	public MajorWrapper getMajors(@RequestParam String code, String type) {
		ArrayList courses = new ArrayList<Course>();
		jdbcTemplate.query("SELECT mcode, name FROM majors WHERE dcode = ? AND type = ?", new Object[] { code, type }, (rs, rowNum) -> 
		new DegreeMajor(rs.getString("mcode"), rs.getString("name"))).forEach(course -> courses.add(course));
		MajorWrapper mwrp = new MajorWrapper(courses);
		return mwrp;
	}
}