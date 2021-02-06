package wyu17.backend;

public class Course {

    private final String code;
    /*
    private final String title;
    private final int units;
    private final boolean sem1;
    private final boolean sum;
    private final boolean sem2;
    private final String prereq;
    private final String incomp;*/

	public Course(String code) {
        this.code = code;
        /*
        this.title = title;
        this.units = units;
        this.sem1 = sem1;
        this.sem2 = sem2;
        this.sum = sum;
        this.prereq = prereq;
        this.incomp = incomp;*/
    }
    
    public String getCode()  {
        return code;
    }
}