package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "included_degrees")
public class IncludedDegree {
    '''
    Represents information about a degree.
    '''

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(unique=true, nullable=false)
    private String dcode;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private int units;

    @OneToMany(mappedBy="degree")
    private Set<DegreeConstraint> degreeConstraints;

    @OneToMany(mappedBy="degree")
    private Set<DegreeOptions> degreeOptions;

    @OneToMany(mappedBy="degree")
    private Set<Major> majors;

    public IncludedDegree() {
    }    
    
    public String getName()  {
        return name;
    }

    public String getDcode()  {
        return dcode;
    }

    public int getUnits()  {
        return units;
    }

    public Set<DegreeConstraint> getDegreeConstraints()  {
        return degreeConstraints;
    }
}