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

		private ArrayList<DegreeName> degrees;
	
		public DegreeNameWrapper(ArrayList<DegreeName> degrees) {
			this.degrees = degrees;
		}
	}

	@Autowired
	JdbcTemplate jdbcTemplate;

	@GetMapping("/allDegrees")
	public DegreeNameWrapper allDegrees() {
		ArrayList degrees = new ArrayList<DegreeName>();
		degrees.add(new DegreeName("code", "name"));
		DegreeNameWrapper degreeNameWrapper = new DegreeNameWrapper(degrees);
		return degreeNameWrapper;
	}

	@GetMapping("/degreeStructures")
	public DegreeName degreeStructures() {
		return new DegreeName("dd", "c");
	}

	@GetMapping("/course")
	public ArrayList<Course> getCourse(@RequestParam String code) {
		ArrayList courses = new ArrayList<Course>();
		jdbcTemplate.query("SELECT title FROM courses WHERE code = ?", new Object[] { code }, (rs, rowNum) -> 
		new Course(rs.getString("title"))).forEach(course -> courses.add(course));
		return courses;
	}
}