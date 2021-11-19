package wyu17.backend;
import java.io.Serializable;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "section_codes_with_options")
public class SectionCodeWithOptions extends SectionCode implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(nullable=false)
    private String optionCode;

    @ManyToMany
    @JoinTable(
        name="section_codes_with_options_course_codes",
        joinColumns=@JoinColumn(name="optionCodeId", referencedColumnName="id"),
        inverseJoinColumns=@JoinColumn(name="CourseId", referencedColumnName="id")
    )
    private Set<Course> courses;

    public SectionCodeWithOptions() {
    }    

    public Set<Course> getCourses() {
        return courses;
    }
}