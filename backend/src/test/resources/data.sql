INSERT INTO included_degrees (dcode, name, units) VALUES ('2000', 'test1', 10);
INSERT INTO included_degrees (dcode, name, units) VALUES ('3000', 'test2', 10);

INSERT INTO majors (mcode, name, type, units, degree_id) VALUES ('MCODE1', 'majorTest1', 'major', 10, 1);
INSERT INTO majors (mcode, name, type, units, degree_id) VALUES ('MCODE2', 'majorTest2', 'major', 10, 1);
INSERT INTO majors (mcode, name, type, units, degree_id) VALUES ('MCODE2', 'majorTest3', 'major', 10, 2);

INSERT INTO sections (max, min, section_name, major_id) VALUES (10, 0, 'sNameTest1', 1);
INSERT INTO sections (max, min, section_name, major_id) VALUES (10, 0, 'sNameTest3', 2);

INSERT INTO courses(code, incomp, prereq, sem1, sem2, sum, title, units) VALUES('TEST1201', '', '', TRUE, FALSE, TRUE, 'TestCourse1', 2);
INSERT INTO courses(code, incomp, prereq, sem1, sem2, sum, title, units) VALUES('TEST1301', '', '', TRUE, FALSE, TRUE, 'TestCourse2', 2);
INSERT INTO courses(code, incomp, prereq, sem1, sem2, sum, title, units) VALUES('TEST1501', '', '', TRUE, FALSE, TRUE, 'TestCourse3', 2);

INSERT INTO section_codes_with_options(option_code, section_id) VALUES('TEST1201+TEST1301', 1);
INSERT INTO section_codes_with_options(option_code, section_id) VALUES('TEST1401+TEST1501', 2);

INSERT INTO section_codes_with_options_course_codes(option_code_id, course_id) VALUES(1, 1);
INSERT INTO section_codes_with_options_course_codes(option_code_id, course_id) VALUES(1, 2);

INSERT INTO section_codes_without_options(course_id, section_id) VALUES(3, 1);
INSERT INTO section_codes_without_options(course_id, section_id) VALUES(1, 2);