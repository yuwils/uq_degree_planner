package wyu17.backend;

public class DegreeName {

	private final String code;
	private final String name;

	public DegreeName(String code, String name) {
		this.code = code;
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}
}