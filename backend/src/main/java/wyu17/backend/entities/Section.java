package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "sections")
public class Section {
    '''
    Represents information about a section of a major.
    '''

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable=false)
    private Integer min;
    @Column(nullable=false)
    private Integer max;
    @Column(nullable=false)
    private String sectionName;

    @ManyToOne
    @JoinColumn(nullable=false)
    private Major major;

    @OneToMany(mappedBy="section")
    private Set<SectionCodeWithOptions> sectionCodesWithOptions;

    @OneToMany(mappedBy="section")
    private Set<SectionCodeWithoutOptions> sectionCodesWithoutOptions;

    public Section() {
    }

    public Integer getMin() {
        return min;
    }

    public Integer getMax() {
        return max;
    }

    public String getSectionName() {
        return sectionName;
    }

    public String getMcode() {
        return major.getMcode();
    }

    public String getDcode() {
        return major.getDcode();
    }
}