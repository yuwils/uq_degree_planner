package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "degree_options")
public class DegreeOptions {
    /**
    Represents options for a degree (i.e the number of majors, minors and extended majors).
    */

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable=false)
    private Integer majors;
    @Column(nullable=false)
    private Integer minors;
    @Column(nullable=false)
    private Integer extendedMajors;

    @ManyToOne
    @JoinColumn(nullable=false)
    private IncludedDegree degree;

    public DegreeOptions() {
    }    
    
    public Integer getMajors()  {
        return majors;
    }

    public Integer getMinors()  {
        return minors;
    }

    public Integer getExtendedMajors()  {
        return extendedMajors;
    }
}