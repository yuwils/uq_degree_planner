package wyu17.backend;

public class Course {

    private final String code;
    private final String title;
    private final int units;
    private final boolean sem1;
    private final boolean sum;
    private final boolean sem2;
    private final String prereq;
    private final String incomp;
    private final boolean optional;

	public Course(String code, String title, int units, int sem1, int sem2, int sum, String prereq, String incomp) {
        this.code = code;
        this.title = title;
        this.units = units;
        this.sem1 = convertInt(sem1);
        this.sem2 = convertInt(sem2);
        this.sum = convertInt(sum);
        this.prereq = prereq;
        this.incomp = incomp;
        this.optional = false;
    }
    
    public boolean convertInt (int integer) {
        if (integer > 0) {
            return true;
        } else {
            return false;
        }
    }
    public String getCode()  {
        return code;
    }

    public String getTitle()  {
        return title;
    }

    public int getUnits() {
        return units;
    }

    public boolean getSem1() {
        return sem1;
    }

    public boolean getSem2() {
        return sem2;
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

    public boolean getOptional() {
        return optional;
    }

}