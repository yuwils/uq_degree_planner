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