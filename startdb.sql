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


INSERT INTO "recipes_schema"."festivals" ("festival_id", "festival_name", "festival_description", "festival_date_time", "festival_image", "festival_creator_name", "festival_creator_email", "festival_location", "updatedAt", "createdAt")
VALUES
  (recipes_schema.uuid_generate_v4(), 'טעם את איטליה', 'פסטיבל אוכל איטלקי', '2024-02-10 18:00:00', 'italian_festival.jpg', 'User1', '1@example.com', '{"41.9028", "12.4964"}', '2024-01-24 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'פיסטה חמה', 'פסטיבל אוכל חריף', '2024-03-15 19:30:00', 'spicy_fiesta.jpg', 'מועדון אוהבי התבלינים', '2@example.com', '{"40.7128" ,"-74.0060"}', '2024-01-24 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'קפה וקרואסונטים', 'פסטיבל קפה ומאפים', '2024-04-20 10:00:00', 'coffee_and_croissants.jpg', 'בייקרי טוב', '7894','{"48.8566" ,"2.3522"}', '2024-01-26 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'טעמי ים', 'פסטיבל אוכל ימי', '2024-05-15 12:00:00', 'seafood_festival.jpg', 'מסעדת הים הכחול', 'dp4605@gmail.com', '{"34.0522", "-118.2437"}', '2024-01-27 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'מסעדות העולם', 'פסטיבל מגוון אוכל', '2024-06-05 15:00:00', 'world_cuisine.jpg', 'אירועים בינלאומיים', 'd@gmail.com', '{"51.5074", "-0.1278"}', '2024-01-27 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'קוקטיילים וברים', 'פסטיבל קוקטיילים מעולים', '2024-07-10 20:00:00', 'cocktail_festival.jpg', 'ברמנים מקצועיים', 'm@gmail.com', '{"40.7128" ,"-74.0060"}', '2024-01-28 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'טעמים אסיאתיים', 'פסטיבל אוכל אסיאתי', '2024-08-01 18:30:00', 'asian_cuisine.jpg', 'מסעדת האסיה הטעימה', 'sdhf@kdsj','{"35.6895" ,"139.6917"}', '2024-01-29 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'טעמי הודו', 'פסטיבל אוכל הודי', '2024-09-05 12:00:00', 'indian_food.jpg', 'מסעדת בהרטי', '3@example.com', '{"28.6139" ,"77.2090"}', '2024-01-28 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'פסטיבל קולינרי ירושלמי', 'חווית אוכל ייחודית', '2024-10-15 19:00:00', 'jerusalem_culinary_festival.jpg', 'מטבח ירושלמי', '3@example.com', '{"31.7683"," 35.2137"}', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'פסטיבל המזרח', 'טעמים מזרחיים מגוונים', '2024-11-02 17:30:00', 'middle_eastern_flavors.jpg', 'מסעדת המזרח', '3@example.com', '{"25.276987" ,"51.520008"}', '2024-01-30 12:00:00', '2024-01-30 12:00:00');


INSERT INTO "recipes_schema"."recipes" ("recipe_id", "title", "category", "image", "creator_name", "creator_email", "sensitivity", "country_of_origin", "difficulty", "ingredients", "instructions", "preparation_time", "num_reviews", "rating", "createdAt", "updatedAt")
VALUES
  -- (recipes_schema.uuid_generate_v4(), 'פסטה ברוסטו עם רוטב עגבניות', 'מנה עיקרית', 'pasta_arrabbiata.jpg', 'שף ג', 'd@gmail.com', 'רגיל', 'איטליה', 'פשוט', '{"250 גרם פסטה", "400 גרם רוטב עגבניות", "2 כפות שטוחות שטוחות שטוחות שטוחות שטוחות שטוחות רוסטו", "3 כפות שטוחות גבינת פרמזן מגוררת", "2 כפות רוסטו"}', 'בשלו את הפסטה על פי ההוראות באריזה. במקביל, כשהפסטה כבר נבשלת, בסיר אחר, כמעט באותו זמן, אנחנו מחממים שטוחה ומוסיפים לה כף רוסטו. אחרי שהכף מחממת את הרוסטו, מנמיכים אש ומוסיפים לתוכה את הרוטב, ומערבבים. מדי פעם מוסיפים כף מהמים שבהם נבשלה הפסטה, וממשיכים לערבב עד שהרוטב חם. מניחים את הפסטה בקערה יחסית גדולה, מוסיפים את הרוטב עליה ומערבבים היטב.', '20 דקות', 5, 4.8, '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
  -- (recipes_schema.uuid_generate_v4(), 'סלט קינואה עם ירקות צלויים', 'סלט', 'quinoa_salad.jpg', 'שף יוסף', '3@example.com', 'כשר', 'ישראל', 'קל', '{"1/2 כוס קינואה", "1 כוס מים", "כף שמן זית", "קינמון", "מלח", "1/2 כוס קפואות חצילים קצוצים", "1/2 כוס גזר קצוץ קטן", "1/2 כוס פפריקה קצוצה", "1/2 כוס חמוציות חמה קצוצות", "1/4 כוס שטוחה של רסק עגבניות", "כף רסק חרדל", "קולורבי", "קורנית קצוצה"}', 'מבשלים את הקינואה עם המים והשמן על להבה גבוהה עד שהיא מתבלה בקרמיות. מתבלים בקינמון וממלאים מלח. מעבירים לקערה, מוסיפים את הירקות והתבלינים היבשים ומערבבים.', '15 דקות', 2, 4.2, '2024-01-26 12:00:00', '2024-01-30 12:00:00')
  (recipes_schema.uuid_generate_v4(), 'תפוחי עץ ותפוחים', 'דסרט', 'apple_crisp.jpg', 'שף אורי', '2@example.com', 'ללא גלוטן', 'צרפת', 'קל', '{"4 תפוחים, קלופים וחתוכים", "1/2 כוס סוכר", "1/2 כוס קמח", "1/2 כוס קווארק", "קמח תפוחים", "1/2 כוס קמח תפוחים", "1/4 כוס סוכר", "1/4 כוס קווארק"}', 'חתוך תפוחים לקעקעים ומערבב עם סוכר. מעביר לתבנית ושמ צמחיה. מערבב בקערה את הקמח, הקווארק והסוכר ומזליף על התפוחים.', '40 דקות', 1, 3.5, '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'קפה קולד בלסמי', 'שתייה', 'cold_brew_coffee.jpg', 'בריסטה מיה', 'dp4605@gmail.com', 'רגיל', 'איטליה', 'קל', '{"1/2 כוס קפה קולד בלסמי", "קוביות קרח", "1/4 כוס חלב אורגני", "סוכר (לפי הטעם)"}', 'מכין קפה קולד בלסמי באמצעות לחץ קר ומשרה עליו קוביות קרח. מוסיף חלב אורגני וסוכר לפי הטעם.', '5 דקות', 15, 4.9, '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
  (recipes_schema.uuid_generate_v4(), 'מלאווח פיסטוק וקרמל', 'קינוח', 'pistachio_caramel_cake.jpg', 'קונדיטור ניר', 'dp4605@gmail.com', 'כשר', 'ישראל', 'בינונית', '{"4 בנות פיסטוק קלות", "1/2 כוס סוכר", "קמח תפוחים", "1/2 כוס חמאה", "קמח חרדל", "קורט חמאה", "1/2 כוס קרם חמוצה", "1/2 כוס קרמל"}', 'מערבבים בקערה את הפיסטוקים והסוכר. מוסיפים חמאה וחמאת קורט ומערבבים. מוסיפים קמח תפוחים וקמח חרדל ומערבבים עד שנקבל תערובת קצירה. מעבירים לתבנית מרופדת בנייר אפייה ומפשירים את התערובת. מכניסים לתנור שחומם מראש ל-170 מעלות על 30 דקות. בינתיים מכינים את הקרם. מערבבים יחד קרם חמוצה, קורם וקרמל.', '60 דקות', 8, 4.5, '2024-01-30 12:00:00', '2024-01-30 12:00:00');
