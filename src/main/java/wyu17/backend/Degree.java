package wyu17.backend;

public class Degree {

    private final int code;
    private final String name;
    private final int units;

	public Degree(int code, String name, int units) {
        this.code = code;
        this.name = name;
        this.units = units;
    }
    
    public String getName()  {
        return name;
    }

    public int getCode()  {
        return code;
    }

    public int getUnits()  {
        return units;
    }
}