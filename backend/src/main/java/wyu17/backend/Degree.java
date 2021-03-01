package wyu17.backend;

public class Degree {

    private final String code;
    private final String name;
    private final int units;

	public Degree(String code, String name, int units) {
        this.code = code;
        this.name = name;
        this.units = units;
    }
    
    public String getName()  {
        return name;
    }

    public String getCode()  {
        return code;
    }

    public int getUnits()  {
        return units;
    }
}