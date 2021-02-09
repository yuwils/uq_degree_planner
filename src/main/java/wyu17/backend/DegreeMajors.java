package wyu17.backend;

public class DegreeMajors {

    private final int code;
    private final int majors;
    private final int minors;
    private final int emajors;

	public DegreeMajors(int code, int majors, int minors, int emajors) {
		this.code = code;
        this.majors = majors;
        this.minors = minors;
        this.emajors = emajors;
	}

	public int getCode() {
		return code;
	}

	public int getMajors() {
		return majors;
    }
    
    public int getMinors() {
		return minors;
    }
    
    public int getEmajors() {
		return emajors;
	}
}