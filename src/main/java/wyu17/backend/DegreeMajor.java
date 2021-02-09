package wyu17.backend;

public class DegreeMajor {

	private final String code;
	private final String name;

	public DegreeMajor(String code, String name) {
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