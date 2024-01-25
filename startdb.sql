-- Active: 1706168817007@@dpg-cmp0jf6g1b2c73f7rht0-a.oregon-postgres.render.com@5432@recipes_wf5a@recipes_schema

CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA recipes_schema;



CREATE TYPE recipes_schema.login_respons AS
(
	jwt_token recipes_schema.token,
	user_details json
);
ALTER TYPE recipes_schema.login_respons
    OWNER TO lhihntov;



CREATE TYPE recipes_schema.login_response AS
(
	user_details json
);
ALTER TYPE recipes_schema.login_response
    OWNER TO lhihntov;



CREATE TYPE recipes_schema.token AS
(
	password text,
	email text,
	isadmin boolean
);
ALTER TYPE recipes_schema.token
    OWNER TO lhihntov;



CREATE TRIGGER password_encrypt 
BEFORE INSERT ON recipes_schema.users
FOR EACH ROW 
EXECUTE PROCEDURE recipes_schema.password_encrypt();



CREATE OR REPLACE FUNCTION recipes_schema.password_encrypt()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  NEW.password = recipes_schema.pgp_sym_encrypt(NEW.password, 'secret_key');
  RETURN NEW;
END;
$BODY$;

ALTER FUNCTION recipes_schema.password_encrypt()
    OWNER TO lhihntov;






CREATE OR REPLACE FUNCTION recipes_schema.decrypt_password_function(
	encrypted_password text)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

DECLARE 
   decrypted_password text;
BEGIN
  
  SELECT recipes_schema.pgp_sym_decrypt(encrypted_password::bytea, 'secret_key')
  INTO decrypted_password;
  
  IF decrypted_password IS NULL THEN
    RAISE EXCEPTION 'Failed to decrypt password';
  END IF;

  RETURN decrypted_password;
  
END;
$BODY$;

ALTER FUNCTION recipes_schema.decrypt_password_function(text)
    OWNER TO lhihntov;





CREATE OR REPLACE FUNCTION recipes_schema.login(
	email text,
	password text)
    RETURNS recipes_schema.login_respons
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
  user_details recipes_schema.users;
  password_hash text;
  user_json json;
  
begin

	select recipes_schema.decrypt_password_function(recipes_schema.users.password)
	 into password_hash
	 FROM recipes_schema.users
	 where recipes_schema.users.email = login.email;
	 
	 
  select a.* into user_details
    from recipes_schema.users as a
    where a.email = login.email;
	
	IF password_hash IS NULL THEN
    RAISE EXCEPTION 'password null Invalid email or password';
  END IF;
  
  if not login.password = password_hash then
  RAISE EXCEPTION 'Invalid email or password';
  end if;
  
  
    user_json = json_build_object(
		'userName', user_details.user_name,
		'isAdmin', user_details."isAdmin",
		'reviews', user_details.reviews,
		'shared', user_details.shared,
		'createdAt', user_details."createdAt",
		'email', user_details.email,
		'userId', user_details.user_id
		
	);
	return row (
 	row(
		user_details.password,
		user_details.email,
		user_details."isAdmin"
	)::recipes_schema.token,
		user_json
    )::recipes_schema.login_respons;
     
  
end;
$BODY$;

ALTER FUNCTION recipes_schema.login(text, text)
    OWNER TO lhihntov;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA recipes_schema



    INSERT INTO "recipes_schema"."users" ("email", "password", "user_name", "isAdmin", "reviews", "shared", "user_id", "createdAt", "updatedAt")
VALUES
  ('1@example.com', '1111', 'User1', false, 3, 2, recipes_schema.uuid_generate_v4(), '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z'),
  ('2@example.com', '1111', 'User2', false, 5, 8, recipes_schema.uuid_generate_v4(), '2024-01-22T13:30:00Z', '2024-01-22T13:30:00Z'),
  ('3@example.com', '1111', 'Admin', true, 10, 15, recipes_schema.uuid_generate_v4(), '2024-01-22T14:45:00Z', '2024-01-22T14:45:00Z');




INSERT INTO "recipes_schema"."recipes" ("recipe_id", "title", "category", "image", "creator_name", "creator_email", "sensitivity", "country_of_origin", "difficulty", "ingredients", "instructions", "preparation_time", "num_reviews", "rating", "createdAt", "updatedAt")
VALUES
  (recipes_schema.uuid_generate_v4(), 'עוגת שוקולד', 'קינוח', 'https://example.com/chocolate-cake.jpg', 'ישראל ישראלי', '1@example.com', 'בינונית', 'ישראל', 'בינונית', '{"2 כוסות קמח רגיל", "כוס סוכר", "חצי כוס קקאו איכותי", "כפית אבקת סודה לשתייה", "חצי כפית אבקת סודה לבישול", "חצי כפית מלח", "כוס חלב", "חצי כוס שמן צמחי", "ביצים גדולות 2", "כפית תמצית וניל", "כוס מים רותחים"}', '1. מחממים תנור ל-175 מעלות צלסיוס. 2. משמנים ומקפיצים שתי תבניות עגולות בקוטר 9 אינצ׳. ...', 'שעה', 10, 4.5 , '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z'),
  (recipes_schema.uuid_generate_v4(), 'ספגטי בולונז', 'מנה עיקרית', 'https://example.com/spaghetti-bolognese.jpg', 'מרים לוי', '1@example.com', 'נמוכה', 'ישראל', 'קלה', '{"400 גרם ספגטי", "ליבה בשר טחון 500 גרם", "בצל קטן, קצוץ דק", "שני שיניים שום, קצוץ דק", "1/2 כוס רוטב עגבניות (14 אונקיות)", "רבע כוס רוטב רגיל (כף ורבע)", "חצי כוס יין אדום", "כפית אורגנו יבש", "כפית בזיליקום יבש", "מלח ופלפל שחור לפי הטעם", "פרמזן מגורר לגישה"}', '1. מבשלים את הספגטי על פי ההוראות באריזה. 2. בסיר רחב ושטוח, מטגנים את הבשר הטחון על להבה גבוהה עם מעט שמן עד שהבשר משנה צבעו ונשמר על החומרת הכביסה הקודמת. ...', '45 דקות', 8, 4.2 , '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z'),
  (recipes_schema.uuid_generate_v4(), 'סלט סיזר עם עוף', 'סלט', 'https://example.com/chicken-caesar-salad.jpg', 'דני כהן', '3@example.com', 'נמוכה', 'ישראל', 'קלה', '{"חזה עוף חתוך לפסים", "קישואים קטנים, קלים", "קולורבי קטן, קל", "קישואים צהובים קטנים, קלים", "רומני, קצוץ גס", "קרוטונים", "פרמזן מגורר", "רוטב סיזר"}', '1. שטוחים את החזה עוף ומבשלים אותו במים רותחים ומלח כ-15 דקות עד שהוא מתייצב. 2. קוטעים את החזה עוף לפסים דקים. ...', '30 דקות', 12, 4.8, '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z');


INSERT INTO "recipes_schema"."festivals" ("festival_id","festival_name", "festival_description", "festival_date_time", "festival_image", "festival_creator_name", "festival_creator_email", "festival_location" , "createdAt", "updatedAt")
VALUES
  (recipes_schema.uuid_generate_v4(),'פסטיבל המוזיקה 2022', 'פסטיבל מוזיקה עם הופעות של אמנים מוכרים', '2022-08-15 18:00:00', 'https://example.com/music-festival.jpg', 'רועי כהן', '2@example.com', '{"32.0844", "34.7997"}', '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z'),
  (recipes_schema.uuid_generate_v4(),'פסטיבל האוכל הגורמה', 'פסטיבל אוכל עם מגוון רחב של מסעדות וסטנדים', '2022-09-10 12:00:00', 'https://example.com/food-festival.jpg', 'שרה לוי', '3@example.com', '{"31.7719", "35.2170"}', '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z'),
  (recipes_schema.uuid_generate_v4(),'פסטיבל הקולנוע הבינלאומי', 'פסטיבל קולנוע עם הקרנות של הסרטים הכי חמים', '2022-10-20 20:30:00', 'https://example.com/film-festival.jpg', 'דני אהרונוביץ', '3@example.com', '{"32.0684", "34.7696"}', '2024-01-22T12:00:00Z', '2024-01-22T12:00:00Z');
