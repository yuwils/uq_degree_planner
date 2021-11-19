package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "section_codes_without_options")
public class SectionCodeWithoutOptions extends SectionCode {
    @ManyToOne
    @JoinColumn(nullable=false)
    private Course course;

    public SectionCodeWithoutOptions() {
    }    

    public Course getCourse() {
        return course;
    }
}