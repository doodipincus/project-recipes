
CREATE DATABASE "Matching"

CREATE SCHEMA matching

DROP TABLE matching.Male;
DROP TABLE matching.female;
DROP TABLE matching.matchmaker;

CREATE TABLE matching.Matchmaker (
matchmakerId serial PRIMARY KEY NOT NULL,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
birthDate TEXT NOT NULL,
email text Unique NOT NULL,
phoneNumber TEXT NOT NULL Unique,
gender TEXT NOT NULL CHECK (gender = 'male' OR gender = 'female'),
specialty TEXT NOT NULL,
password TEXT NOT NULL,
createdAt DATE DEFAULT CURRENT_TIMESTAMP,
updatedAt DATE DEFAULT CURRENT_TIMESTAMP
);





CREATE TABLE matching.Female(
matchFemaleId serial PRIMARY KEY NOT NULL,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
birthDate TEXT NOT NULL,
email text Unique NOT NULL,
phoneNumber TEXT NOT NULL Unique,
password TEXT NOT NULL,
currentAddress TEXT ,
origin TEXT NOT NULL,
height NUMERIC NOT NULL,
higherEducation TEXT NOT NULL,
educationName TEXT,
higherEducationAcademy TEXT,
jobStatus TEXT NOT NULL,
jobCompany TEXT,
seminar TEXT NOT NULL,
headwear TEXT NOT NULL,
pelKoshers TEXT NOT NULL,
fatherName TEXT,
motherName TEXT,
maritalStatus TEXT NOT NULL,
gender TEXT NOT NULL CHECK (gender = 'male' OR gender = 'female'),
imgLink TEXT,
createdAt DATE DEFAULT CURRENT_TIMESTAMP,
updatedAt DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matching.Male(
matchMaleId serial PRIMARY KEY NOT NULL,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
birthDate TEXT NOT NULL,
email text Unique NOT NULL,
phoneNumber TEXT NOT NULL Unique,
password TEXT NOT NULL,
currentAddress TEXT ,
origin TEXT NOT NULL,
height NUMERIC NOT NULL,
yeshiva TEXT NOT NULL,
torahStudyStatus TEXT NOT NULL,
higherEducation TEXT NOT NULL,
educationName TEXT,
higherEducationAcademy TEXT,
jobStatus TEXT NOT NULL,
jobCompany TEXT NOT NULL,
headwear TEXT NOT NULL,
pelKoshers TEXT NOT NULL,
fatherName TEXT,
motherName TEXT,
maritalStatus TEXT NOT NULL,
gender TEXT NOT NULL CHECK (gender = 'male' OR gender = 'female'),
imgLink TEXT,
createdAt DATE DEFAULT CURRENT_TIMESTAMP,
updatedAt DATE DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE matching.token AS (
 password TEXT, email TEXT
);

CREATE TYPE matching.login_response AS (
  jwt_token matching.token,
  user_details  json
);






CREATE FUNCTION matching.decrypt_password_function(encrypted_password text) 
RETURNS text AS $$
DECLARE 
   decrypted_password text;
BEGIN
  
  SELECT matching.pgp_sym_decrypt(encrypted_password::bytea, 'secret_key')
  INTO decrypted_password;
  
  IF decrypted_password IS NULL THEN
    RAISE EXCEPTION 'Failed to decrypt password';
  END IF;

  RETURN decrypted_password;
  
END;
$$ LANGUAGE plpgsql;










CREATE OR REPLACE FUNCTION matching.login(email text, password text, tablename text) 
RETURNS matching.login_response AS $$

DECLARE
  hashed_password text;
  currentmale matching.Male;
  currentfemale matching.Female;
  currentmatchmakers matching.Matchmaker;
  user_json json;
BEGIN
-- 
IF login.tablename = 'female' THEN
  SELECT matching.decrypt_password_function(matching.Female.password) 
  INTO hashed_password
  FROM matching.Female 
  WHERE matching.Female.email = login.email;

  SELECT a.*
  INTO currentfemale
  FROM matching.Female as a
  WHERE a.email = login.email;

  IF hashed_password IS NULL THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

  IF NOT hashed_password =  login.password THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

   user_json = json_build_object(
    'matchfemaleid', currentfemale.matchFemaleId,
'firstname', currentfemale.firstName,
'lastname', currentfemale.lastName,
'birthdate', currentfemale.birthDate,
'email', currentfemale.email,
'phonenumber', currentfemale.phoneNumber,
'currentaddress', currentfemale.currentAddress,
'origin', currentfemale.origin,
'height', currentfemale.height,
'highereducation', currentfemale.higherEducation,
'educationname', currentfemale.educationName,
'highereducationacademy', currentfemale.higherEducationAcademy,
'jobstatus', currentfemale.jobStatus,
'jobcompany', currentfemale.jobCompany,
'seminar', currentfemale.seminar,
'headwear', currentfemale.headwear,
'pelkoshers', currentfemale.pelKoshers,
'fathername', currentfemale.fatherName,
'mothername', currentfemale.motherName,
'maritalstatus', currentfemale.maritalStatus,
'gender', currentfemale.gender,
'imglink', currentfemale.imgLink,
"createdAt", currentfemale.createdat,
"updatedAt", currentfemale, updatedat
   );
   RETURN ROW(
    ROW(currentfemale.email,
      currentfemale.password)::matching.token,
      user_json
    )::matching.login_response;
  END IF;
--  ----------------------------------------------------------
  IF login.tablename = 'male' THEN
  SELECT matching.decrypt_password_function(matching.Male.password) 
  INTO hashed_password
  FROM matching.Male 
  WHERE matching.Male.email = login.email;

  SELECT a.*
  INTO currentmale
  FROM matching.Male as a
  WHERE a.email = login.email;

  
  IF hashed_password IS NULL THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

  IF NOT hashed_password =  login.password THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

   user_json = json_build_object(
    'matchmaleid', currentmale.matchMaleId,
'firstname', currentmale.firstName,
'lastname', currentmale.lastName,
'birthdate', currentmale.birthDate,
'email', currentmale.email,
'phonenumber', currentmale.phoneNumber,
'currentaddress', currentmale.currentAddress,
'origin', currentmale.origin,
'height', currentmale.height,
'yeshiva', currentmale.yeshiva,
'torahstudystatus', currentmale.torahStudyStatus,
'highereducation', currentmale.higherEducation,
'educationname', currentmale.educationName,
'highereducationacademy', currentmale.higherEducationAcademy,
'jobstatus', currentmale.jobStatus,
'jobcompany', currentmale.jobCompany,
'headwear', currentmale.headwear,
'pelkoshers', currentmale.pelKoshers,
'fathername', currentmale.fatherName,
'mothername', currentmale.motherName,
'maritalstatus', currentmale.maritalStatus,
'gender', currentmale.gender,
'imglink', currentmale.imgLink,
"createdAt", currentmale.createdat,
"updatedAt", currentmale, updatedat
   );
   RETURN ROW(
    ROW(currentmale.email,
      currentmale.password)::matching.token,
      user_json
    )::matching.login_response;
 END IF;
-- -------------------------------------------
  IF login.tablename = 'matchmaker' THEN
  SELECT matching.decrypt_password_function(matching.Matchmaker.password) 
    INTO hashed_password
  FROM matching.Matchmaker 
  WHERE matching.Matchmaker.email = login.email;

  SELECT a.*
  INTO currentmatchmakers
  FROM matching.Matchmaker as a
  WHERE a.email = login.email;

  
  IF hashed_password IS NULL THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

  IF NOT hashed_password =  login.password THEN
    RAISE EXCEPTION 'Invalid email or password';
  END IF;

   user_json = json_build_object(
    'matchmakerid', currentmatchmakers.matchmakerId,
'firstname', currentmatchmakers.firstName,
'lastname', currentmatchmakers.lastName,
'birthdate', currentmatchmakers.birthDate,
'email', currentmatchmakers.email,
'phonenumber', currentmatchmakers.phoneNumber,
'specialty', currentmatchmakers.specialty,
'gender', currentmatchmakers.gender
   );
   RETURN ROW(
    ROW(currentmatchmakers.email,
      currentmatchmakers.password)::matching.token,
      user_json
    )::matching.login_response;
  END IF;

END;
$$ LANGUAGE plpgsql;














CREATE FUNCTION matching.password_encrypt() 
RETURNS trigger AS $$
BEGIN
  NEW.password = matching.pgp_sym_encrypt(NEW.password, 'secret_key');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER password_encrypt 
BEFORE INSERT ON matching.Female
FOR EACH ROW 
EXECUTE PROCEDURE matching.password_encrypt();


CREATE TRIGGER password_encrypt 
BEFORE INSERT ON matching.male
FOR EACH ROW 
EXECUTE PROCEDURE matching.password_encrypt();

CREATE TRIGGER password_encrypt 
BEFORE INSERT ON matching.Matchmaker
FOR EACH ROW 
EXECUTE PROCEDURE matching.password_encrypt();























CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA matching;


CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;

SELECT matching.pgp_sym_encrypt('test', 'key');
SELECT matching.pgp_sym_decrypt('\xC30D040703027D952C91FB3674E675D2350172E6A19737360EA7C1CF8382825DE1FA43071360D93F471801A9EF4DC077BA3935270BAD6ED1FE5C1B44261C2F91BC3758BD36FF', 'key');





SELECT * FROM pg_extension WHERE extname = 'pgcrypto';



SELECT n.nspname, p.proname, pg_catalog.pg_get_function_arguments(p.oid) as params
FROM   pg_catalog.pg_proc p
JOIN   pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE  p.proname ~~* '%pgp_sym_decrypt%'
AND    pg_catalog.pg_function_is_visible(p.oid);