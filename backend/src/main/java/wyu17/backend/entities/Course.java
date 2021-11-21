package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    /**
    Represents information about a university course.
    */
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(unique=true, nullable=false)
    private String code;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private Integer units;

    @Column(nullable=false)
    private boolean sem1;

    @Column(nullable=false)
    private boolean sem2;
    
    @Column(nullable=false)
    private boolean sum;

    @Lob
    @Column(nullable=false)
    private String prereq;

    @Lob
    @Column(nullable=false)
    private String incomp;

    public Course() {
    }    
    
    public String getCode()  {
        return code;
    }

    public String getTitle()  {
        return title;
    }

    public Integer getUnits()  {
        return units;
    }

    public boolean getSem1() {
        return sem1;
    }

    public boolean getSem2() {
        return sem1;
    }

    public boolean getSum() {
        return sum;
    }

    public String getPrereq()  {
        return prereq;
    }

    public String getIncomp()  {
        return incomp;
    }
}