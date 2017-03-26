-- change participation targetType format
ALTER TABLE PARTICIPATION
DROP COLUMN  TARGET_TYPE;

ALTER TABLE PARTICIPATION
ADD TARGET_TYPE VARCHAR(50) DEFAULT NULL;

-- fusion des tables categorie et challengeType
ALTER TABLE COURSE
DROP COLUMN  CATEGORY_ID;

ALTER TABLE COURSE
ADD CHALLENGE_TYPE_ID INTEGER NOT NULL;

DROP TABLE CATEGORY;

ALTER TABLE COURSE
ADD CONSTRAINT FK__COURSE_CHALLENGE_TYPE_ID FOREIGN KEY (CHALLENGE_TYPE_ID) REFERENCES CHALLENGE_TYPE (ID);