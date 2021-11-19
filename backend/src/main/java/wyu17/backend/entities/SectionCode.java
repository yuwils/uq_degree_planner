package wyu17.backend;
import java.util.*;
import javax.persistence.*;

@MappedSuperclass
public class SectionCode {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(nullable=false)
    private Section section;

    public SectionCode() {
    }    

    public String getDcode() {
        return section.getDcode();
    }

    public String getMcode() {
        return section.getMcode();
    }

    public String getSection() {
        return section.getSectionName();
    }
}