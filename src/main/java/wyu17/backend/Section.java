package wyu17.backend;

public class Section {

	private final String code;
	private final String name;
    private final int min;
    private final int max;

	public Section(String code, String name, int min, int max) {
		this.code = code;
        this.name = name;
        this.min = min;
        this.max = max;
	}

	public String getCode() {
		return code;
	}
	
	public String getName() {
		return name;
    }

	public int getMin() {
		return min;
    }

	public int getMax() {
		return max;
	}
}