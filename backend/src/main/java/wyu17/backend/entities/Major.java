package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "majors")
public class Major {
    /**
    Represents information about a major of a degree (major/minor/extended major).
    */

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable=false)
    private String mcode;
    @Column(nullable=false)
    private String type;
    @Column(nullable=false)
    private String name;
    @Column(nullable=false)
    private Integer units;

    @ManyToOne
    @JoinColumn(nullable=false)
    private IncludedDegree degree;

    @OneToMany(mappedBy="major")
    private Set<Section> sections;

    public Major() {
    }

    public String getDcode() {
        return degree.getDcode();
    }

    public String getMcode() {
        return mcode;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public Integer getUnits() {
        return units;
    }
}