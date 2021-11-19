package wyu17.backend;
import javax.persistence.*;

@Entity
@Table(name = "degree_constraints")
public class DegreeConstraint {
    '''
    Represents constraints on a degree.
    '''

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable=false)
    private String degreeConstraint;

    @ManyToOne
    @JoinColumn(nullable=false)
    private IncludedDegree degree;

    public DegreeConstraint() {
    }    

    public String getConstraint()  {
        return degreeConstraint;
    }
}